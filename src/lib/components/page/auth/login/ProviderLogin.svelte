<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        href: string;
        name: string;
        icon: string;
        color: string;
        backgroundColor: string;
        invert?: boolean;
    }

    let {href, name, icon, color, backgroundColor, invert = false}: Props = $props();

    const lang = getLang();
    let i18n = $derived(getI18N("/auth/login", $lang));
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

    span {
        transform: translateY(-1px);
    }
</style>
