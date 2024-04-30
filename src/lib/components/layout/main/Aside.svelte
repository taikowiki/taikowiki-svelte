<script lang="ts">

</script>

<aside> 
    <slot />
</aside>

<style>
    aside{
        width: 300px;
    }

    @media only screen and (max-width:1000px){
        aside{
            display:none;
        }
    }
</style>