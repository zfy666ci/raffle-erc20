# Token Holder Raffle System

A fair raffle system that randomly selects 100 winners from token holders based on their total holdings of AR, AISTR, and ALCH tokens.

## Weighted Random Selection
The raffle uses a weighted random algorithm where holding more tokens increases your chances of winning. Here's how it works:

### Example Scenario:
If we have three holders:
- Holder A: 1000 tokens (50% of total)
- Holder B: 600 tokens (30% of total)
- Holder C: 400 tokens (20% of total)
- Total: 2000 tokens

Their chances of winning would be:
- Holder A: 50% chance
- Holder B: 30% chance
- Holder C: 20% chance

## Getting Started

### Step 1: Data Collection
1. Visit [Dune Analytics Query](https://dune.com/queries/4481826)
2. Set the block number parameter for the snapshot
3. Run the query to get token holders data
4. Export the results to CSV format

### Step 2: Data Preparation
1. Create three text files in the project directory:
   - `ar_holders.txt` for AR token holders
   - `aistr_holders.txt` for AISTR token holders
   - `alch_holders.txt` for ALCH token holders

2. Format each line in the files as:
   ```
   address----amount
   ```
   Example:
   ```
   0x1234...5678----1000.5
   0xabcd...efgh----500.25
   ```

### Step 3: Run the Raffle
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the raffle script:
   ```bash
   node raffle.js
   ```

## Output
The script will:
1. Read holder data from all three files
2. Calculate total holdings for each address
3. Randomly select 100 winners (weighted by total holdings)
4. Display results in the console
5. Save detailed results to `raffle_results.json`

### Output Format
Console output shows:
```
1. Address: 0x1234...5678
   Total Amount: 1500.75
   AR: 1000.5
   AISTR: 500.25
   ALCH: 0
```

JSON output includes:
- Timestamp
- Total number of winners
- Detailed holdings for each winner

## Notes
- Higher total holdings increase the chance of winning
- Each address can only win once
- The selection is random but weighted by total holdings
- All three token holdings contribute equally to the weight

## Requirements
- Node.js
- npm
- Three data files with holder information
