import server from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Shipment API", () => {
  /**
   * Test the GET route
   */
  describe("GET /shipment", () => {
    it("It should GET all the shipments", (done) => {
      chai
        .request(server)
        .get("/shipment")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe("GET /shipment/:id", () => {
    it("It should GET a shipment by ID", (done) => {
      const shipmentId = 1;
      chai
        .request(server)
        .get("/shipment/" + shipmentId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          response.body.should.have.property("origin");
          response.body.should.have.property("destination");
          response.body.should.have.property("description");
          response.body.should.have.property("createdAt");
          response.body.should.have.property("updatedAt");
          done();
        });
    });

    it("It should NOT GET a shipment by ID", (done) => {
      const shipmentId = 123;
      chai
        .request(server)
        .get("/shipment" + shipmentId)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /shipment", () => {
    it("It should POST a new shipment", (done) => {
      const shipment = {
        origin: "Nigeria",
        destination: "Qatar",
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .post("/shipment")
        .send(shipment)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("Shipment was create successfully");
          done();
        });
    });

    it("It should NOT POST a new shipment without the origin property", (done) => {
      const shipment = {
        destination: "Qatar",
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .post("/shipment")
        .send(shipment)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */
  describe("PUT /shipment/:id", () => {
    it("It should PUT an existing shipment", (done) => {
      const shipmentId = 1;
      const shipment = {
        origin: "Nigeria",
        destination: "Qatar",
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .put("/shipment/" + shipmentId)
        .send(shipment)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq(`Shipment with id = ${shipmentId} was update successfully`);
          done();
        });
    });

    it("It should NOT PUT a non existing shipment", (done) => {
      const shipmentId = 150;
      const shipment = {
        origin: "Nigeria",
        destination: "Qatar",
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .put("/shipment/" + shipmentId)
        .send(shipment)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  // /**
  //  * Test the DELETE route
  //  */
  // describe("DELETE /shipment/:id", () => {
  //   it("It should DELETE an existing shipment", (done) => {
  //     const shipmentId = 1;
  //     chai
  //       .request(server)
  //       .delete("/shipment/" + shipmentId)
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         response.body.should.be.a("object");
  //         response.body.should.have
  //           .property("message")
  //           .eq(`Shipment with id = ${shipmentId} was delete successfully`);
  //         done();
  //       });
  //   });

  //   it("It should NOT DELETE a shipment that is not in the database", (done) => {
  //     const shipmentId = 145;
  //     chai
  //       .request(server)
  //       .delete("/shipment/" + shipmentId)
  //       .end((err, response) => {
  //         response.should.have.status(500);
  //         done();
  //       });
  //   });
  // });
});
