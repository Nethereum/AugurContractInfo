# AugurContractInfo
Augur contract information combining serpent files and augur-contracts tx. Outputs to a json file as:

```javascript
{
            "name": "faucets",
            "functions": [
                {
                    "functionName": "cashFaucet",
                    "parameters": "",
                    "returns": "number",
                    "send": true
                },
                {
                    "functionName": "reputationFaucet",
                    "parameters": "branch",
                    "signature": "i",
                    "returns": "number",
                    "send": true
                },
                {
                    "functionName": "fundNewAccount",
                    "parameters": "branch",
                    "signature": "i",
                    "returns": "number",
                    "send": true
                }
            ],
            "to": "0x895d32f2db7d01ebb50053f9e48aacf26584fe40"

```

Current output can be found here : https://github.com/Nethereum/AugurContractInfo/blob/master/contractsInfo.json
