import server from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("TrackingStep API", () => {
  /**
   * Test the GET route
   */
  describe("GET /trackingstep", () => {
    it("It should GET all the trackingsteps", (done) => {
      chai
        .request(server)
        .get("/trackingstep")
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
  describe("GET /trackingstep/:id", () => {
    it("It should GET a trackingstep by ID", (done) => {
      const trackingstepId = 7;
      chai
        .request(server)
        .get("/trackingstep/" + trackingstepId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(7);
          response.body.should.have.property("name");
          response.body.should.have.property("status");
          response.body.should.have.property("createdAt");
          response.body.should.have.property("updatedAt");
          response.body.should.have.property("completedAt");
          response.body.should.have.property("containerId");
          done();
        });
    });

    it("It should NOT GET a trackingstep by ID", (done) => {
      const trackingstepId = 123;
      chai
        .request(server)
        .get("/trackingstep" + trackingstepId)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /trackingstep", () => {
    it("It should POST a new trackingstep", (done) => {
      const trackingstep = {
        name: "Bordeau pour Lyon",
        status: "IN_PROGRESS",
        containerId: 8,
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
        completedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .post("/trackingstep")
        .send(trackingstep)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("TrackingStep was create successfully");
          done();
        });
    });

    it("It should NOT POST a new trackingstep without the name property", (done) => {
      const trackingstep = {
        status: "IN_PROGRESS",
        containerId: 7,
        createdAt: "2022-04-21 05:41:20.000",
        updatedAt: "2022-04-21 05:41:20.000",
        completedAt: "2022-04-21 05:41:20.000",
      };
      chai
        .request(server)
        .post("/trackingstep")
        .send(trackingstep)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */
  describe("PUT /trackingstep/:id", () => {
    it("It should PUT an existing trackingstep", (done) => {
      const trackingstepId = 1;
      const trackingstep = {
        name: "Bordeau pour Berberre",
        status: "IN_PROGRESS",
      };
      chai
        .request(server)
        .put("/trackingstep/" + trackingstepId)
        .send(trackingstep)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq(
              `TrackingStep with id = ${trackingstepId} was update successfully`
            );
          done();
        });
    });

    it("It should NOT PUT a non existing trackingstep", (done) => {
      const trackingstepId = 150;
      const trackingstep = {
        name: "Bordeau pour Berberre",
        status: "IN_PROGRESS",
        containerId: 7,
        createdAt: "2022-04-25 05:41:20.000",
        updatedAt: "2022-04-25 05:41:20.000",
        completedAt: "2022-04-25 05:41:20.000",
      };
      chai
        .request(server)
        .put("/trackingstep/" + trackingstepId)
        .send(trackingstep)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  describe("DELETE /trackingstep/:id", () => {
    it("It should DELETE an existing trackingstep", (done) => {
      const trackingstepId = 16;
      chai
        .request(server)
        .delete("/trackingstep/" + trackingstepId)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should NOT DELETE a trackingstep that is not in the database", (done) => {
      const trackingstepId = 145;
      chai
        .request(server)
        .delete("/trackingstep/" + trackingstepId)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });
});
