<template>
   
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return{
            movie: null
        }
    },
    mounted(){
        axios.get('http://www.omdbapi.com/?s=The+Secret+Life+of+Pets&type=movie&apikey=23daade9')
        .then(response => {
            (this.movies = response.data.Search.slice(0,2))
                console.log(this.movies)
            })
    }
}
</script>