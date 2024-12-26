const fs = require('fs').promises

class TokenRaffle {
    constructor() {
        this.holders = new Map()
    }

    async loadHolders(filePath, tokenType) {
        try {
            const data = await fs.readFile(filePath, 'utf8')
            const lines = data.split('\n')
            
            for (const line of lines) {
                if (!line.trim()) continue
                
                let [address, amount] = line.split('----')
                address = address.trim()
                amount = parseFloat(amount.trim())

                if (!address || isNaN(amount)) continue

                let holder = this.holders.get(address) || {
                    AR: 0,
                    AISTR: 0,
                    ALCH: 0,
                    total: 0
                }
                
                holder[tokenType] = amount
                holder.total = holder.AR + holder.AISTR + holder.ALCH
                this.holders.set(address, holder)
            }
        } catch (err) {
            console.log(`Error reading ${filePath}:`, err.message)
        }
    }

    pickWinners(count = 100) {
        let addresses = Array.from(this.holders.keys())
        let amounts = Array.from(this.holders.values()).map(h => h.total)
        let winners = new Set()
        let totalAmount = amounts.reduce((sum, amt) => sum + amt, 0)
        while (winners.size < count && winners.size < addresses.length) {
            let random = Math.random() * totalAmount
            let sum = 0
            
            for (let i = 0; i < addresses.length; i++) {
                sum += amounts[i]
                if (random <= sum && !winners.has(addresses[i])) {
                    winners.add(addresses[i])
                    break
                }
            }
        }

        return Array.from(winners).map(addr => ({
            address: addr,
            ...this.holders.get(addr)
        }))
    }
}

async function main() {
    console.log('Starting raffle...')
    const raffle = new TokenRaffle()
    
    console.log('Loading holder data...')
    await raffle.loadHolders('./ar_holders.txt', 'AR')
    await raffle.loadHolders('./aistr_holders.txt', 'AISTR')
    await raffle.loadHolders('./alch_holders.txt', 'ALCH')
    
    console.log('Selecting winners...')
    const winners = raffle.pickWinners(100)
    
    console.log('\nWinners:')
    winners.forEach((w, i) => {
        console.log(`\n${i + 1}. ${w.address}`)
        console.log(`   Total: ${w.total}`)
        console.log(`   AR: ${w.AR}`)
        console.log(`   AISTR: ${w.AISTR}`)
        console.log(`   ALCH: ${w.ALCH}`)
    })

    const result = {
        date: new Date().toISOString(),
        winners: winners
    }

    await fs.writeFile('winners.json', JSON.stringify(result, null, 2))
    console.log('\nResults saved to winners.json')
}

main().catch(console.error)
