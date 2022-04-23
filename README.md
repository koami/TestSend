# Send Backend Dev Test

This is the test set by the tech lead of Send in order to recrute a new backend dev.

## Installation

Use the package [prisma ](https://www.prisma.io/) as our ORM to install this project.

```bash
npm install
npx prisma migrate dev --name init
```

## Usage

```javascript
/**
 * Endpoints routes
 */

// create a shipment
"/shipment";

// update the tracking steps of a container
"/trackingstep/id";

//get all containers in a shipment
"/container/by-shipment/id";

//get all shipments with their containers
"/shipment";
```

## Objectives

1. The restful APIs is build using Node and Express
2. The code is writen in a clean, structured, readable and maintainable way also as DRY
3. The unit tests are writen using mocha
4. The entities structure and relationships is done with prisma
5. We didn't built auth and users as it is just a part of a system

## License

[MIT](https://choosealicense.com/licenses/mit/)
