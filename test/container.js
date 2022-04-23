import server from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Container API", () => {
  /**
   * Test the GET route
   */
  describe("GET /container", () => {
    it("It should GET all the containers", (done) => {
      chai
        .request(server)
        .get("/container")
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
  describe("GET /container/:id", () => {
    it("It should GET a container by ID", (done) => {
      const containerId = 4;
      chai
        .request(server)
        .get("/container/" + containerId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(4);
          response.body.should.have.property("name");
          response.body.should.have.property("shipmentId");
          response.body.should.have.property("createdAt");
          response.body.should.have.property("updatedAt");
          done();
        });
    });

    it("It should NOT GET a container by ID", (done) => {
      const containerId = 123;
      chai
        .request(server)
        .get("/container" + containerId)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by shipment id) route
   */
  describe("GET /container/by-shipment/:id", () => {
    it("It should GET a list of containers with sipment ID", (done) => {
      const shipmentId = 4;
      chai
        .request(server)
        .get("/container/by-shipment/" + shipmentId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It should NOT GET a list of containers with shipment ID", (done) => {
      const shipmentId = 123;
      chai
        .request(server)
        .get("/container/by-shipment/" + shipmentId)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /container", () => {
    it("It should POST a new container", (done) => {
      const container = {
        name: "Alpha",
        shipmentId: 3,
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .post("/container")
        .send(container)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("Container was create successfully");
          done();
        });
    });

    it("It should NOT POST a new container without the name property", (done) => {
      const container = {
        shipmentId: 3,
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .post("/container")
        .send(container)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */
  describe("PUT /container/:id", () => {
    it("It should PUT an existing container", (done) => {
      const containerId = 4;
      const container = {
        name: "Alpha",
        shipmentId: 3,
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .put("/container/" + containerId)
        .send(container)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq(`Container with id = ${containerId} was update successfully`);
          done();
        });
    });

    it("It should NOT PUT a non existing container", (done) => {
      const containerId = 150;
      const container = {
        name: "Alpha",
        shipmentId: 3,
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .put("/container/" + containerId)
        .send(container)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  describe("DELETE /container/:id", () => {
    // UNCOMMENT
    it("It should DELETE an existing container", (done) => {
      const containerId = 17;
      chai
        .request(server)
        .delete("/container/" + containerId)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should NOT DELETE a container that is not in the database", (done) => {
      const containerId = 145;
      chai
        .request(server)
        .delete("/container/" + containerId)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });
});
