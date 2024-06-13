<script lang="ts" context="module">
    import type { UserData } from "$lib/module/common/user/types.js";
    import axios from "axios";

    async function setGrade(UUID: string, from: number, to: number) {
        try {
            await axios({
                url: "/admin/api/user/set_grade",
                data: {
                    UUID,
                    from,
                    to,
                },
                method: "post",
            });
            alert("변경 성공");
        } catch {
            alert("변경 실패");
        }
    }
</script>

<script lang="ts">
    export let data;

    const { users } = data;

    const grades: number[] = [];
    users.forEach((user) => {
        grades.push(user.grade);
    });
</script>

<table>
    <tr>
        <th> UUID </th>
        <th> 닉네임 </th>
        <th> 등급 </th>
    </tr>
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
                    on:click={() => {
                        setGrade(user.UUID, user.grade, grades[index]);
                    }}
                >
                    변경
                </button>
            </td>
        </tr>
    {/each}
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
