<script lang="ts" module>
    import { User } from "$lib/module/user";
    import '$lib/module/user/user.client';

    async function setGrade(UUID: string, from: number, to: number) {
        const response = await User.Client.adminRequest.setGrade({
            UUID,
            from,
            to,
        });
        if (response.status === "success") {
            alert("변경 성공");
        } else {
            alert("변경 실패");
        }
    }
</script>

<script lang="ts">
    let {data} = $props();

    const { users } = data;

    const grades: number[] = [];
    users.forEach((user) => {
        grades.push(user.grade);
    });
</script>

<table>
    <thead>
        <tr>
            <th> UUID </th>
            <th> 닉네임 </th>
            <th> 등급 </th>
        </tr>
    </thead>
    <tbody>
        {#each users as user, index}
            <tr>
                <td>
                    {user.UUID}
                </td>
                <td>
                    {user.nickname}
                </td>
                <td>
                    <input
                        bind:value={grades[index]}
                        type="number"
                        min="1"
                        max="10"
                    />
                    <button
                        onclick={() => {
                            setGrade(user.UUID, user.grade, grades[index]);
                        }}
                    >
                        변경
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    td {
        width: calc(100% / 3);
        border: 1px solid black;

        text-align: center;
    }
</style>
