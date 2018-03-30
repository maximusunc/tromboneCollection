import axios from "axios";

export default {
    // gets all trombones
    getTrombones: function() {
        return axios.get("/api/trombones");
    },
    // gets the details of a specific trombone
    getTrombone: function(id) {
        return axios.get("/api/trombones/" + id);
    },
    // admin can update existing trombones
    updateTrombone: function(id, state) {
        return axios.put("/api/trombones/" + id, state);
    },
    // admin can delete existing trombones
    deleteTrombone: function(id) {
        return axios.delete("/api/trombones/" + id);
    },
    // admin can add trombones to db
    addTrombone: function(trombone) {
        return axios.post("/api/trombones", trombone);
    }
};