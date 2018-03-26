import axios from "axios";

export default {
    // performs the API request
    getTrombones: function() {
        return axios.get("/api/trombones");
    },
    getTrombone: function(id) {
        return axios.get("/api/trombones/" + id);
    },
    updateTrombone: function(id, state) {
        console.log(state);
        return axios.put("/api/trombones/" + id, state);
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