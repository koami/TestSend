import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const { trackingStep: TrackingStep, container: Container } = prisma;

export default {
  getAll(req, res) {
    TrackingStep.findMany()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Some error occured while trying to get all trackingSteps",
        });
      });
  },

  get(req, res) {
    const { id } = req.params;
    TrackingStep.findUnique({
      where: {
        id: parseInt(id),
      },
    })
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(404).send({
              message: `Can not find trackingStep with id = ${id}`,
            });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to get trackingStep with id = ${id}`,
        });
      });
  },

  async create(req, res) {
    const { containerId, name, status, completedAt } = req.body;
    let defineStatus = true;
    try {
      const containerTrackingsteps = await TrackingStep.findMany({
        where: {
          containerId: parseInt(containerId),
        },
      });
      let tempDefineStatus = true;
      containerTrackingsteps.forEach((trackingStep) => {
        if (trackingStep.status != "COMPLETE") {
          tempDefineStatus = false;
        }
      });
      defineStatus = tempDefineStatus;
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
    TrackingStep.create({
      data: {
        containerId: parseInt(containerId),
        name: name,
        status: defineStatus ? "IN_PROGRESS" : status,
        completedAt: completedAt,
      },
    })
      .then(() => {
        res.status(201).send({
          message: `TrackingStep was create successfully`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message,
        });
      });
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, status } = req.body;
    let proceed = false;

    if (status == "COMPLETE") {
      try {
        const currentTracking = await TrackingStep.findUnique({
          where: {
            id: parseInt(id),
          },
        });
        const containerTrackingsteps = await TrackingStep.findMany({
          where: {
            containerId: parseInt(currentTracking.containerId),
          },
        });
        let tempProceed = true;
        containerTrackingsteps.forEach((trackingStep) => {
          if (trackingStep.id != id && trackingStep.status != "COMPLETE") {
            tempProceed = false;
          }
        });
        proceed = tempProceed;
      } catch (error) {}
    } else {
      proceed = true;
    }

    if (proceed) {
      TrackingStep.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
          status: status,
        },
      })
        .then(() => {
          res.status(200).send({
            message: `TrackingStep with id = ${id} was update successfully`,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              `Some error occured while trying to update trackingStep with id = ${id}`,
          });
        });
    } else {
      res.status(404).send({
        message: `A previous trackingStep is not complete`,
      });
    }
  },

  delete(req, res) {
    const { id } = req.params;
    TrackingStep.delete({
      where: {
        id: parseInt(id),
      },
    })
      .then(() => {
        res.status(200).send({
          message: `TrackingStep with id = ${id} was delete successfully`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            `Some error occured while trying to delete trackingStep with id = ${id}`,
        });
      });
  },
};
