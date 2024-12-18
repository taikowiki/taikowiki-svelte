<script lang="ts">
    interface Props{
        qr: string;
    }

    let {qr = $bindable()}: Props = $props();
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