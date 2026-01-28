# Purpose

Tyto instrukce definují obecné standardy pro code review v tomto repozitáři. Používej je při hodnocení všech PR napříč backendem, frontendem i sdíleným kódem.

## Základní pokyny před zahájením review

- Před psaním komentářů se vždy seznam s existujícím kódem a architekturou projektu.
- Nikdy neodhaduj účel souboru nebo funkce – vycházej pouze z reálného obsahu kódu a kontextu v repozitáři.
- Pokud je to možné, projdi všechny relevantní soubory, které se změny dotýkají, a hledej souvislosti (např. sdílené typy, helpery, hooky, API klienty).
- V komentářích vždy jasně uveď, z jakého kontextu vycházíš (např. „v souboru X je podobná funkce implementovaná jinak“).

Po načtení těchto instrukcí:
- Uveď, že jsi instrukce přečetl a rozumíš jim.
- Stručně vypiš, co považuješ za nejdůležitější (např. důraz na konzistenci, bezpečnost, práci s existujícím kódem).

## Obecné standardy kódu

- Dodržuj čistý, čitelný a konzistentní kód.
- Preferuj jednoduchá, dobře pojmenovaná řešení před „chytrým“ ale nečitelným kódem.
- Upřednostňuj funkcionální přístup tam, kde to dává smysl (pure functions, minimal side effects).
- Dbej na konzistenci napříč projektem (styl, pojmenování, struktura složek).

## Nástroje a formátování

- Předpokládej použití ESLint a Prettier; nekomentuj stylistické věci, které nástroje automaticky opraví, pokud nejsou v rozporu s domluvenými pravidly.
- Pokud navrhuješ změnu formátování, odkazuj se na konzistenci s existujícím kódem nebo konfigurací nástrojů.

## Pojmenování a struktura

- Funkce, proměnné a komponenty pojmenovávej tak, aby bylo z názvu jasné „co“ dělají, ne „jak“.
- Dbej na konzistentní pojmenování napříč souvisejícími soubory (např. `*Service`, `*Repository`, `*Page`, `*Section`).
- Upřednostňuj menší, dobře zaměřené moduly před monolitickými soubory.

## Komentáře a dokumentace

- Komentáře navrhuj tam, kde kód řeší neintuitivní nebo doménově specifickou logiku.
- Pokud je logika příliš složitá, navrhni její rozdělení nebo zjednodušení místo přidávání dlouhých komentářů.
- U veřejných API, sdílených utilit a hooků doporučuj stručnou dokumentaci (JSDoc/TSDoc, README, storybook).

## Bezpečnost a spolehlivost

- Upozorňuj na:
  - nevalidovaný vstup,
  - práci s citlivými daty,
  - potenciální XSS/CSRF problémy,
  - nebezpečné zacházení s tokeny a přístupovými údaji.
- Navrhuj bezpečnější alternativy (např. parametrizované dotazy, escapování vstupu, bezpečné ukládání tajemství).

## Testování

- Pokud změna zasahuje do logiky, zvaž, zda by neměla být doplněna nebo upravena testovací sada.
- Navrhuj testy, které pokrývají:
  - hlavní „šťastnou cestu“,
  - klíčové edge cases,
  - regresní scénáře pro dříve nahlášené chyby.

## Výkon a udržovatelnost

- Upozorňuj na zbytečnou složitost, duplikace a potenciálně nákladné operace v hot path.
- Preferuj řešení, která jsou snadno udržovatelná a rozšiřitelná, i když nejsou „nejchytřejší“ z hlediska mikro-optimalizací.
