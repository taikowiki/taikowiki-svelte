<script lang="ts">
    import type { DaniType } from "$lib/module/common/dani/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    interface Props {
        dan: DaniType.Dan;
    }

    let { dan }: Props = $props();

    const lang = getLang();
    let i18n = $derived(getI18N("other", $lang));

    let danPlate = $derived(
        dan === "gaiden"
            ? "gaiden"
            : dan === "tatsujin"
              ? "tatsujin"
              : dan === "chojin" || dan === "meijin" || dan === "kuroto"
                ? "jin"
                : dan === "fukusho"
                  ? "fukusho"
                  : dan === "chiuken"
                    ? "chiuken"
                    : dan === "jiho"
                      ? "jiho"
                      : dan.endsWith("kyu") || dan === "beginner"
                        ? "kyu"
                        : dan === "10dan" ||
                            dan === "9dan" ||
                            dan === "8dan" ||
                            dan === "7dan" ||
                            dan === "6dan" ||
                            dan === "taisho"
                          ? "red-dan"
                          : "blue-dan",
    );
</script>

<div
    style={`background-image: url('/assets/icon/dani/plate/${danPlate}.webp');`}
    class:ko={$lang === "ko"}
    class:ja={$lang === "ja"}
>
    <span>
        {i18n.dani.dan[dan]}
    </span>
</div>

<style>
    div {
        min-width: 56px;
        height: 34px;

        padding-inline: 3px;

        display: flex;
        justify-content: center;
        align-items: center;

        background-size: calc(100% + 2px) 34px;
        background-position: center center;
        background-repeat: no-repeat;

        font-size: 19px;
        font-weight: bold;
        font-family: "Han";
        color: white;

        text-shadow: 1px 1px black;

        transform: translateY(0px);
    }

    span {
        transform: translateY(-1px);
    }

    .ko {
        font-family: "KuK";
    }

    .ko span {
        transform: translateY(0.5px);
    }

    .ja {
        font-family: "Hak";
    }

    .ja span {
        transform: translate(-0.25px, -0.5px);
    }
</style>
