# u07-individuell-uppgift-JobChaser

## Veckans teoretiska frågor

## Vecka 1

# 1. Allmänt om ramverket React: Hur/Varför uppkom det? Vad är centralt i React?

React skapades av Facebook (kallas nu Meta) år 2013. Anledningen var att Facebook behövde ett sätt att bygga interaktiva användargränssnitt som kunde hantera stora mängder data och uppdateringar effektivt. Tidigare lösningar gjorde det svårt att uppdatera och återanvända komponenter på ett smidigt sätt.

React har utan tvekan blivit ett av de mest populära JavaScript-biblioteken för att bygga användargränssnitt. Med React så kan man dela upp UI i mindre återanvändbara delar genom Komponentbaserad arkitektur. Med Virtual DOM så uppdateras endast de delar av gränssnittet som förändras, vilket gör det snabbare samt att React har One-way data flow (datan skickas från föräldra elementet till barn) vilket gör att koden blir lättare att felsöka. En till central del i React är något som kallas React Hooks - vilket tillåter en att hantera state och livscykelmetoder i funktionella komponenter.

# 2. Vad är JSX?

JSX står för JavaScript XML, vilket är ett syntax-tillägg för Javascript som låter en skriva HTML-liknande kod direkt inuti Javascript. React använder JSX för att skapa komponenter och strukturera UI:t på ett mer läsbart sätt, med JSX så blir det lättare att skriva och lägga till HTML liknande kod direkt i React. JSX omvandlas till vanlig JavaScript med hjälp av Babel innan det körs i webbläsaren.

# 3. Vad är en komponent?

En komponent är en återanvändbar del av användargränssnittet i React. Den kan vara en funktionell komponent eller en klasskomponent.
Komponenter kan ta emot data (props) och hantera sitt eget tillstånd (state).

# 4. Vad är props?

Props förkortning av "properties" används för att skicka data från en förälder-komponent till en barn-komponent.

# 5. Vad menas med one-way-dataflow?

One-way data flow betyder enriktad dataflöde vilket innebär att data endast går från förälder till barn, inte tvärtom. Detta gör att det blir lättare att hantera och felsöka applikationen. Om en barn-komponent behöver ändra data, skickar den en signal (t.ex. en callback-funktion) till förälder-komponenten, som sedan uppdaterar datan.

# 6. Hur kan man använda sig av konditionell rendering i React?

Konditionell rendering innebär att en komponent visar olika saker beroende på ett visst villkor.

# 7. Vad menas med en återanvändbar komponent?

En återanvändbar komponent är en komponent som kan återanvändas på flera ställen i en applikation genom att skicka olika props.

## Vecka 2

# 1. Vad är state i React?

State är ett inbyggt objekt i React-komponenter som används för att hantera data som kan förändras över tid. När state uppdateras, renderas komponenten om automatiskt för att visa den nya informationen. I funktionella komponenter används `useState`-hooken för att skapa och uppdatera state.

# 2. Vad är det för skillnad mellan state och props?

State och props används båda för att hantera data i React, men de fungerar på olika sätt. Med state så kan koden korrigeras med `useState` eller `setState`, och sedan kommer att orsaka omrendering om state uppdateras. Medans med props så är det endast "Read-only" och props i sig förändras inte i komponenten vilket betyder att det inte omrenderas. State används när en komponent själv hanterar data som kan ändras och Props används för att skicka data mellan komponenter.

# 3. Vad menas med en kontrollerad komponent i React?

En kontrollerad komponent är ett formulärfält där React hanterar värdet genom state, istället för att låta webbläsaren göra det. Man använder kontrollerade komponenter för att göra det lättare att validera och hantera formulärdata, möjliggör diretkt koppling till andra delar av applikationen och React styr inputfältet helt och håller.

# 4. Vad är en callback handler?

En callback handler är en funktion som skickas som prop till en annan komponent och anropas när en viss händelse sker, exempelvis vid knapptryck.

# 5. Vad menas med "lifting state up"?

"Lifting state up" betyder att flytta state från en barnkomponent till en gemensam förälder-komponent så att flera komponenter kan använda samma data. Problem som man kan stöta på utan "lifting state up":
Om två komponenter behöver dela på samma data men har separata states, blir det svårt att hålla dem synkroniserade.

Lösning till problemet:
Flytta state till en förälderkomponent och skicka det som props till barnkomponenterna.

# 6. Vad är syftet med useEffect-hook i React?

`useEffect` används för att köra kod vid sidladdning och vid förändringar i state eller props. Det används ofta för:

- Hämta data från API:er
- Uppdatera dokumenttiteln
- Spara eller läsa data från localStorage
- Ansluta eller koppla bort event listeners

# 7. Vad är syftet kring den s.k dependency-arrayen i useEffect?

Dependency-arrayen ([]) i `useEffect` styr när effekten ska köras.

## Vecka 3

# 1. Vilka fördelar finns det med att använda NextJS? Nackdelar?

Next.js erbjuder många prestandaförbättringar jämfört med vanlig React. En stor fördel är att det har inbyggt stöd för server-side rendering (SSR) och static site generation (SSG), vilket gör att sidor laddas snabbare och får bättre SEO. Next.js hanterar även automatisk kodsplittring, vilket innebär att endast nödvändig kod laddas på varje sida, vilket förbättrar prestandan. En annan styrka är att routing är inbyggt, så man slipper konfigurera React Router manuellt. Dessutom har Next.js stöd för API Routes, vilket gör det möjligt att skriva backend-funktionalitet direkt i samma kodbas.

Nackdelar:
Next.js är mer komplext än vanlig React eftersom det finns flera sätt att rendera sidor på, vilket kan göra det svårare att välja rätt strategi. För mindre projekt kan Next.js kännas överflödigt eftersom dess funktioner inte alltid behövs. Dessutom kan byggtiden bli lång om man använder statisk sidgenerering på en stor applikation.

# 2. Vad menas med Routing? På vilket sätt löser NextJS Routing v.s "vanliga React"?

Routing handlar om hur användaren navigerar mellan olika sidor i en applikation. I en vanlig React-applikation måste man använda ett externt bibliotek som React Router för att hantera routing, och man behöver manuellt definiera vilka komponenter som ska visas för olika URL:er.

Next.js har istället ett filsystembaserat routingsystem, där varje sida automatiskt blir tillgänglig baserat på filstrukturen. Det betyder att om man skapar en ny fil i en viss mapp så genererar Next.js en route för den sidan utan att man behöver konfigurera något manuellt. Det gör att routing blir enklare och mer organiserat.

# 3. Vad menas med Reacts ekosystem? Nämn några viktiga bibliotek i Reacts ekosystem?

Reacts ekosystem består av de verktyg, bibliotek och teknologier som används tillsammans med React för att bygga applikationer.
Några viktiga bibliotek är:
-React Router för att hantera navigering och routing i single-page applications.
-Redux Toolkit, Zustand och Recoil för att hantera globalt state och göra det lättare att arbeta med delad data i applikationen.
-React Query för att hantera API-förfrågningar och caching av data från externa källor.

# 4. Vad är syftet med useContext? Vilket problem med props löser den?

Syftet med useContext är att hantera delad data mellan komponenter utan att behöva skicka den genom props. I större applikationer kan det bli problematiskt att skicka props genom flera nivåer av komponenter, något som kallas "prop drilling".

## Vecka 4

# 1. Vad är Redux Toolkit?

Redux Toolkit är en förenklad och moderniserad version av Redux, som gör det enklare att hantera globalt state i React-applikationer. Det löser många av de problem som vanlig Redux har, som att det kräver mycket boilerplate-kod och är svårt att hantera i större projekt.

# 2. När, i vilka situationer vill man använda Redux Toolkit?

Redux Toolkit är mest användbart i situationer där många komponenter behöver dela på samma data, eller där state är komplext och behöver hanteras på ett strukturerat sätt.

## Resonemang kring projectet

Jag upplevde detta projekt som väldigt svårt, det var svårt att gå från React -> Next.js -> Redux Toolkit.
Det har varit svårt och kompliserat att få till så att allt fungerar i Next.js vilket gjorde att jag inte hade nog med tid att göra om all kod så att det fungerar med redux toolkit.
En styrka som projektet har är att man kan söka på jobbtitel, stad, län och arbetstider direkt i sökrutan. Jag försökte även lägga till en funktion som skulle spara jobb på en användares profil men fick inte riktigt ihop det.

Du kan dock registrera dig som användare och logga in/ ut efter att du har registrerat dig.
Det som inte är så bra med projektet var att jag inte fick till routingen som jag ville, efter att du har loggat in eller registrerat dig så stannar du kvar på sidan- jag skulle vilja att man per automatik som användare blir slussad till jobs sidan. Du kan inte heller spara jobben efter att du har loggat in. Du som användare kan endast läsa om jobben.

Jag är inte nöjd med resultatet då jag inte hann klart med allt, jag känner att jag inte riktigt har hängt med på vad som skulle behövas göras och i vilken ordning.
