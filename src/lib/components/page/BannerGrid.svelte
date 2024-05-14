<div class="container">
    <slot/>
</div>

<style>
    .container{
        display:grid;
        grid-template-columns: repeat(2, calc(50% - 5px));
        column-gap: 10px;
    }
</style>