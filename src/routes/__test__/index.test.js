const app = require("../../../app");
const request = require("supertest");

describe('GET /get-super-admin', ()=>{
    it('get super admin data', async ()=>{
        const url = `/get-super-admin`
        return request.get(url).then((res)=>{
            expect(res.body.data).to.not.be.eq(1);
        })
    })
})

// describe("GET APIs", () => {
//   test("It get all users", async () => {
//     let result = await request(app)
//       .get("/get-super-admin")
//       .expect(200)
//       .expect("Content-Type", "application/json")
//       .end(function (err, res) {
//         if (err) throw err;
//       });
//   });
// });
