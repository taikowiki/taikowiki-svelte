<script lang="ts">

</script>

<aside> 
    <slot />
</aside>

<style>
    aside{
        width: 250px;

        display:flex;
        flex-direction: column;
        row-gap: 10px;
    }

    @media only screen and (max-width:1000px){
        aside{
            display:none;
        }
    }
</style>