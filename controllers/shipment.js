import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const {
  shipment: Shipment,
  container: Container,
  trackingstep: TrackingStep,
} = prisma;

export default {
  async getAll(req, res) {
    let data = [];
    try {
      let shipments = await Shipment.findMany();
      let containers = await Container.findMany();

      shipments.forEach((shipment) => {
        let tempContainers = {};
        let tempShipment = shipment;
        tempContainers = containers.filter((container) => {
          return container.shipmentId == shipment.id;
        });
        tempShipment["containers"] = tempContainers;
        data.push(tempShipment);
      });

      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  get(req, res) {
    const { id } = req.params;
    Shipment.findUnique({
      where: {
        id: parseInt(id),
      },
    })
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(404).send({
              message: `Can not find shipment with id = ${id}`,
            });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to get shipment with id = ${id}`,
        });
      });
  },

  create(req, res) {
    const { origin, destination, description } = req.body;
    Shipment.create({
      data: {
        origin: origin,
        destination: destination,
        description: description,
      },
    })
      .then(() => {
        res.status(201).send({
          message: `Shipment was create successfully`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to create shipment`,
        });
      });
  },

  update(req, res) {
    const { id } = req.params;
    const { origin, destination, description } = req.body;
    Shipment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        origin: origin,
        destination: destination,
        description: description,
      },
    })
      .then(() => {
        res.status(200).send({
          message: `Shipment with id = ${id} was update successfully`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to update shipment with id = ${id}`,
        });
      });
  },

  // async delete(req, res) {
  //   const { id } = req.params;
  //   let trackingStepsToDelete = [];
  //   const containersToDelete = await Container.findMany({
  //     where: {
  //       shipmentId: parseInt(id),
  //     },
  //   });

  //   containersToDelete.forEach(async (container) => {
  //     const deleteTrackingSteps = TrackingStep.deleteMany({
  //       where: {
  //         containerId: parseInt(container.id),
  //       },
  //     });
  //     // trackingStepsToDelete.push(currentTrackingStep);
  //   });

  //   const deleteContainers = await Container.deleteMany({
  //     where: {
  //       shipmentId: parseInt(id),
  //     },
  //   });
  //   const deleteShipment = Shipment.delete({
  //     where: {
  //       id: parseInt(id),
  //     },
  //   });

  //   prisma
  //     .$transaction([deleteContainers, deleteShipment])
  //     .then(() => {
  //       res.status(200).send({
  //         message: `Shipment with id = ${id} was delete successfully`,
  //       });
  //     })
  //     .catch((error) => {
  //       res.status(500).send({
  //         message:
  //           error.message ||
  //           `Some error occured while trying to delete shipment with id = ${id}`,
  //       });
  //     });
  // },
};
