# AugurContractInfo
Augur contract information combining serpent files and augur-contracts tx. Outputs to a json file as:

```javascript
"name": "faucets",
        "address": "0x895d32f2db7d01ebb50053f9e48aacf26584fe40",
        "functions": [
            {
                "functionName": "reputationFaucet",
                "parameters": "branch",
                "signature": "i",
                "returns": "number",
                "send": true,
                "abi": {
                    "name": "reputationFaucet",
                    "type": "function",
                    "serpent": true,
                    "constant": false,
                    "inputs": [
                        {
                            "name": "branch",
                            "signature": "i",
                            "type": "int"
                        }
                    ],
                    "outputs": [
                        {
                            "name": "",
                            "type": "int"
                        }
                    ]
                }
            },
            {
                "functionName": "cashFaucet",
                "parameters": "",
                "returns": "number",
                "send": true,
                "abi": {
                    "name": "cashFaucet",
                    "type": "function",
                    "serpent": true,
                    "constant": false,
                    "inputs": [],
                    "outputs": [
                        {
                            "name": "",
                            "type": "int"
                        }
                    ]
                }
            },
            {
                "functionName": "fundNewAccount",
                "parameters": "branch",
                "signature": "i",
                "returns": "number",
                "send": true,
                "abi": {
                    "name": "fundNewAccount",
                    "type": "function",
                    "serpent": true,
                    "constant": false,
                    "inputs": [
                        {
                            "name": "branch",
                            "signature": "i",
                            "type": "int"
                        }
                    ],
                    "outputs": [
                        {
                            "name": "",
                            "type": "int"
                        }
                    ]
                }
            }
        ]
    },
```

Current output can be found here : https://github.com/Nethereum/AugurContractInfo/blob/master/contractsInfo.json
