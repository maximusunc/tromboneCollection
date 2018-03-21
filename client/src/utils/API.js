import axios from "axios";

export default {
    // performs the API request
    getTrombones: function() {
        return axios.get("/api/trombones");
    },
    // get a single trombone's details
    getTrombone: function(id) {
        return axios.get("/api/trombones/" + id);
    },
    // get trombone by maker
    getByMaker: function(maker) {
        return axios.post("/api/trombones" + maker);
    },
    // loads the saved articles from the database
    loadSaved: function() {
        return axios.get("/api/articles");
    },
    // saves an article to the database
    saveArticle: function(article) {
        return axios.post("/api/articles", article);
    },
    // deletes an article from the database
    deleteArticle: function(id) {
        return axios.delete("/api/articles/" + id);
    }
};