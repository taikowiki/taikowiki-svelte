<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    export let href: string;
    export let name: string;
    export let icon: string;
    export let color: string;
    export let backgroundColor: string;
    export let invert: boolean = false;

    const lang = getLang();
    $: i18n = getI18N('/auth/login', $lang);
</script>

<a {href} style={`color:${color};background-color:${backgroundColor};`}>
    <img src={icon} alt="login" style={invert ? "filter:invert(100%);" : ""} />
    <span>{name}{i18n.forLogin}</span>
</a>

<style>
    img {
        width: 30px;
    }

    a {
        width: 250px;
        height: 50px;

        border-radius: 10px;

        display: flex;
        justify-content: center;
        align-items: center;

        column-gap: 10px;

        font-size: 17px;

        text-decoration: none;
    }

    span{
        transform: translateY(-1px);
    }
</style>
