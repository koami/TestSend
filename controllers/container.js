import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const { container: Container, trackingStep: TrackingStep } = prisma;

export default {
  getAll(req, res) {
    Container.findMany()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Some error occured while trying to get all containers",
        });
      });
  },

  getContainerByShipment(req, res) {
    const { id } = req.params;
    Container.findMany({
      where: {
        shipmentId: parseInt(id),
      },
    })
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(404).send({
              message: `Can not find containers from shipment with id = ${id}`,
            });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to get container with id = ${id}`,
        });
      });
  },

  get(req, res) {
    const { id } = req.params;
    Container.findUnique({
      where: {
        id: parseInt(id),
      },
    })
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(404).send({
              message: `Can not find container with id = ${id}`,
            });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to get container with id = ${id}`,
        });
      });
  },

  create(req, res) {
    const { id } = req.params;
    const { shipmentId, name } = req.body;
    Container.create({
      data: {
        shipmentId: parseInt(shipmentId),
        name: name,
      },
    })
      .then(() => {
        res.status(201).send({
          message: `Container was create successfully`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to create container`,
        });
      });
  },

  update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    Container.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
      },
    })
      .then(() => {
        res.status(200).send({
          message: `Container with id = ${id} was update successfully`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to update container with id = ${id}`,
        });
      });
  },

  updateTrackingStep(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    TrackingStep.update({
      where: {
        containerId: parseInt(id),
      },
      data: {
        name: name,
      },
    })
      .then(() => {
        res.status(200).send({
          message: `Container with id = ${id} was update successfully`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to update container with id = ${id}`,
        });
      });
  },

  delete(req, res) {
    const { id } = req.params;
    const deleteTrackingSteps = TrackingStep.deleteMany({
      where: {
        containerId: parseInt(id),
      },
    });
    const deleteContainer = Container.delete({
      where: {
        id: parseInt(id),
      },
    });

    prisma
      .$transaction([deleteTrackingSteps, deleteContainer])
      .then(() => {
        res.status(200).send({
          message: `Container with id = ${id} was delete successfully`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to delete container with id = ${id}`,
        });
      });
  },
};
