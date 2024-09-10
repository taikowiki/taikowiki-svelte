<script lang="ts">
    export let qr: string = '';
</script>

<tr>
    <td> qr </td>
    <td>
        <input type="text" bind:value={qr} />
    </td>
</tr>

<style>
    td{
        border: 1px solid black;
    }

    td:nth-child(1){
        width: 100px;
        text-align: center;
    }
</style>