<script lang="ts">
    export let name: Record<string, string>;
</script>

<tr>
    <td> 이름 </td>
    <td>
        ja <input type="text" bind:value={name.ja} />
        ko <input type="text" bind:value={name.ko} />
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