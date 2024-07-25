# Spirii - Coding Challenge

## Get started

### Install dependencies

```bash
npm install
```

### Start API server

```bash
npm start
```

### Test

```bash
npm test
```

## API endpoint examples

### `GET` User information (including balance, earned and so forth)

#### Request

```bash
curl -X GET "http://localhost:3000/users/074092"
```

#### Response

```json
{
  "id": "074092",
  "balance": 57.599999999999994,
  "earned": 3.5999999999999996,
  "spent": 36,
  "payout": 90,
  "paidOut": 0
}
```

### `GET` List of requested payouts (aggregated for each user)

#### Request

```bash
curl -X GET "http://localhost:3000/payouts-aggregated"
```

#### Response

```json
{
  "items": [
    {
      "userId": "074092",
      "amount": 120
    }
  ]
}
```
