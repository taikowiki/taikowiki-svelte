<script lang="ts">

</script>

<aside> 
    <slot />
</aside>

<style>
    aside{
        width: 250px;
    }

    @media only screen and (max-width:1000px){
        aside{
            display:none;
        }
    }
</style>