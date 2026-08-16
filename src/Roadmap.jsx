import React, { useState, useEffect, useMemo, useRef } from "react";

const PHASES = [
  {
    id: "p0", num: "00", title: "GRUNDLAGE", sub: "Darf ich das überhaupt?",
    angle: 200, color: "#f0b429",
    steps: [
      { id: "s1", t: "Arbeitsvertrag prüfen", d: "Nebenbeschäftigung, Konkurrenzverbot während und nach dem Arbeitsverhältnis, Geheimhaltung, Eigentum an Arbeitsergebnissen", w: "Bevor du mit fremden Firmen sprichst, muss klar sein, ob du das überhaupt darfst. Auch ohne ausdrückliche Klausel besteht während eines laufenden Arbeitsverhältnisses eine gesetzliche Treuepflicht nach Art. 321a OR. Wird das später zum Problem, ist die investierte Zeit verloren — und der Konflikt mit dem Arbeitgeber real.", a: ["Arbeitsvertrag hervornehmen und vollständig lesen, nicht überfliegen","Klauseln zu Nebenbeschäftigung markieren: Melde- oder Zustimmungspflicht?","Konkurrenzverbot während des Arbeitsverhältnisses prüfen","Nachvertragliches Konkurrenzverbot prüfen — Dauer, geografisches Gebiet, sachlicher Umfang","Geheimhaltungsklausel und Umfang bestimmen","Regelung zu Eigentum an Arbeitsergebnissen und Erfindungen","Unklare Formulierungen wörtlich notieren","Bei relevanter Unsicherheit: 30 Minuten Arbeitsrechtler"], f: "00-projekt/arbeitsvertrag-pruefung.md ist ausgefüllt und enthält einen klaren Entscheid: Projekt kann / kann nicht / kann eingeschränkt weiterverfolgt werden. Der Vertrag selbst liegt nicht im Repository." },
      { id: "s2", t: "Informationsgrenze festlegen", d: "Schriftlich: was aus dem beruflichen Umfeld darf ins Projekt, was nicht", w: "Du hast Zugang zu Wissen, das teils dir gehört und teils dem Arbeitgeber. Die Grenze verläuft nicht immer sauber. Sie muss vorher gezogen sein — nicht in dem Moment, in dem eine Zahl gerade praktisch wäre.", a: ["Zwei Listen anlegen: verwendbar und nicht verwendbar","Verwendbar: allgemeines Branchenwissen, selbst erlernte Abläufe, eigene Beobachtungen auf abstrakter Ebene, öffentliche Quellen","Nicht verwendbar: Kundenlisten, Preise, Kalkulationen, Verträge, interne Vorlagen, konkrete Umsatz- und Personaldaten, Systemexporte, personenbezogene Daten","Grenzfälle notieren und entscheiden","Regel festhalten: bei Zweifel weglassen oder klären lassen"], f: "Die Liste existiert schriftlich und du könntest sie jemandem zeigen, ohne dich zu winden." },
    ],
    gateTitle: "GATE 0", gateText: "Das Vorhaben darf unter definierten Grenzen geprüft und extern besprochen werden.",
  },
  {
    id: "p1", num: "01", title: "PROBLEM & MARKT", sub: "Existiert das Problem ausserhalb des eigenen Betriebs?",
    angle: 265, color: "#22d3ee",
    steps: [
      { id: "s3", t: "Eigene Ausgangshypothese skizzieren", d: "Max. 1 Stunde. Ausdrücklich als n=1 kennzeichnen, nicht als Branchenstandard", w: "Deine eigene Erfahrung ist der Ausgangspunkt — und gleichzeitig die grösste Verzerrungsquelle. Wenn du deinen Betrieb zuerst im Detail modellierst, gehst du mit einem fertigen Bild in die Interviews und fragst unbewusst ab, wo andere davon abweichen. Deshalb bewusst grob.", a: ["Timer auf 60 Minuten stellen und einhalten","Welche Systeme werden bei euch eingesetzt?","Wo werden Daten mehrfach erfasst?","Wo entstehen Medienbrüche?","Welche Schritte sind Handarbeit?","Wo vermutest du Fehlerquellen und Zeitverluste?","Ãœberschrift setzen: Ausgangshypothese aus einem einzelnen Betrieb — nicht als Branchenstandard bestätigt"], f: "Ein Dokument von ein bis zwei Seiten. Wenn es länger ist, hast du zu lange gearbeitet." },
      { id: "s4", t: "Interviewstrategie erstellen", d: "Zielprofile definieren: Grössenklassen, Einsatzarten, Software vs. Excel", w: "Wen du fragst, bestimmt was du hörst. Zehn Gespräche mit ähnlichen Firmen erzeugen ein falsches Gefühl von Bestätigung. Die Streuung über Grössen, Einsatzarten und Digitalisierungsgrad ist das eigentliche Instrument.", a: ["Profile definieren: unter 10 Mitarbeitende, 10–25, 25–100","Einsatzarten abdecken: Revier, Objekt, Baustelle, Verkehr, Anlass","Mindestens eine Firma mit moderner Software, mindestens eine mit Excel und Papier","Pro Profil zwei bis drei Namen aus dem persönlichen Netzwerk sammeln","Zugangsweg pro Kontakt notieren: persönlich bekannt, Empfehlung, kalt","Reihenfolge festlegen — mit den einfachsten Kontakten beginnen"], f: "Eine Liste mit mindestens acht Namen und je einem Zugangsweg." },
      { id: "s5", t: "Interviewleitfaden entwickeln", d: "Offener Einstieg, Zeitbonus-Fragen erst spät", w: "Ein schlechter Leitfaden produziert höfliche Zustimmung statt Erkenntnis. Die Reihenfolge entscheidet: Wer zuerst nach dem Zeitbonus fragt, signalisiert eine fertige Lösung im Kopf und bekommt Antworten darauf zugeschnitten.", a: ["Mit einer offenen Erzählfrage beginnen: Ablauf von der Anfrage bis zur Rechnung","Nicht unterbrechen, nur zum Weitererzählen ermutigen","Danach Systemlandschaft, dann Aufwand und Fehler","Zeitbewertung und GAV-Zeitbonus erst im vierten Teil","Keine Frage stellen, die die eigene Hypothese im Wortlaut enthält","Rollenklärung für den Gesprächsbeginn formulieren","Signalliste zum Auswerten anhängen"], f: "01-gate1-problem-markt/interviews/leitfaden.md ist so weit fertig, dass du ihn einem Fremden geben könntest." },
      { id: "s6", t: "Erste 2–3 Gespräche führen", d: "Aus dem persönlichen Netzwerk. Nicht verkaufen, zuhören", w: "Hier entscheidet sich das Projekt. Alles davor war Vorbereitung. Die ersten zwei bis drei Gespräche sind bewusst wenige, weil du danach den Leitfaden anpassen wirst — und das willst du nicht erst nach zehn Gesprächen tun.", a: ["Rollenklärung zu Beginn: persönliches Vorhaben, nicht im Auftrag des Arbeitgebers","Nicht verkaufen. Keine Lösung beschreiben","Erzählen lassen und mitschreiben, auch was nebensächlich wirkt","Direkt nach dem Gespräch notieren, nicht am Abend","Pseudonymisiert ablegen: Firma A, Firma B","Aktiv festhalten, was der eigenen Hypothese widerspricht"], f: "Zwei bis drei ausgefüllte Notizdokumente. In jedem steht etwas unter „Widerspricht der Hypothese“ — sonst wurde nicht genau genug zugehört." },
      { id: "s7", t: "Marktsignale bewerten", d: "Weitervermittlung und zweites Gespräch sind die härtesten Signale", w: "Nach Gesprächen neigt man dazu, Freundlichkeit als Interesse zu lesen. Die Signalliste ist der Schutz davor. Massstab ist der Aufwand, den der Gesprächspartner freiwillig auf sich nimmt.", a: ["Pro Gespräch die Signalliste durchgehen","Härteste Signale: Weitervermittlung, Zusage zum zweiten Gespräch","Mittlere: Ablauf freiwillig gezeigt, konkrete Probleme mit Zahlen genannt","Schwächste: hypothetische Preiszustimmung — kostet nichts","Kein Signal: „Spannend, halten Sie mich auf dem Laufenden“","Ehrlich zählen, nicht wohlwollend interpretieren"], f: "Pro Gespräch eine nüchterne Bewertung. Du kannst benennen, welches Gespräch das stärkste Signal geliefert hat und warum." },
      { id: "s8", t: "Weitere 5–7 Gespräche", d: "Leitfaden erst nach den ersten Gesprächen anpassen", w: "Die ersten Gespräche zeigen, welche Fragen falsch gestellt waren. Erst danach lohnt sich Menge. Ziel sind insgesamt acht bis zehn Gespräche über verschiedene Profile.", a: ["Leitfaden anhand der ersten Erkenntnisse überarbeiten","Fragen streichen, die nichts gebracht haben","Neue Fragen ergänzen, die sich aus Überraschungen ergeben haben","Fünf bis sieben weitere Gespräche führen","Auf Profilstreuung achten, nicht nur die einfachsten Kontakte nehmen","Nach jedem Gespräch dokumentieren"], f: "Insgesamt acht bis zehn Gespräche, dokumentiert, mit erkennbaren Mustern über verschiedene Firmenprofile hinweg." },
      { id: "s9", t: "Marktanalyse parallel", d: "Anzahl Firmen, Grössenverteilung, Anbieter, Preise. Bandbreiten statt erfundener Präzision", w: "Recherche ersetzt keine Feldarbeit, aber sie ordnet ein. Sie beantwortet, ob der Markt gross genug ist — was Gespräche nicht können. Bei Schweizer Branchendaten ist die Lage dünn; erwarte Bandbreiten.", a: ["Anzahl Sicherheitsunternehmen in der Schweiz recherchieren","Grössenverteilung, soweit ermittelbar","VSSU-Mitglieder gegenüber nicht organisierten Anbietern","Sprachregionen und Einsatzschwerpunkte","Bestehende Softwarelösungen erfassen: Funktionsumfang, Preise, Lizenzmodelle","Wechselbarrieren identifizieren","Jede Aussage kennzeichnen: FAKT, UNVOLLSTAENDIG, SCHAETZUNG, SCHLUSS","Keine erfundene Präzision — Bandbreiten sind ehrlicher"], f: "99-recherche/quellen.md enthält die Aussagen mit Einordnung. Wo Zahlen fehlen, steht das ausdrücklich da." },
      { id: "s10", t: "Abbruchkriterien anwenden", d: "Gate 1 wird nicht automatisch bestanden", w: "Gate 1 wird nicht automatisch bestanden. Ohne diesen Schritt wird jede Analyse zur Bestätigungsmaschine — man findet immer einen Grund weiterzumachen.", a: ["Alle neun Abbruchkriterien durchgehen und Status setzen","Bei erfüllten Kriterien: Fortsetzung ausdrücklich begründen oder abbrechen","Die Frage schriftlich beantworten: Was wäre der überzeugendste Grund, jetzt zu beenden?","Ergebnis im Entscheidungsprotokoll festhalten","Erst danach über die Gate-1-Freigabe entscheiden"], f: "Jedes Kriterium hat einen Status. Die Scheitern-Frage ist schriftlich beantwortet, auch wenn sie nicht zum Abbruch führt." },
    ],
    gateTitle: "GATE 1", gateText: "Problem und Markt sind ausreichend validiert. Wir dürfen das Produkt definieren.",
  },
  {
    id: "p2", num: "02", title: "PRODUKT & MVP", sub: "Was genau, für wen zuerst?",
    angle: 330, color: "#a78bfa",
    steps: [
      { id: "s11", t: "Erstes Zielsegment bestimmen", d: "Eng schneiden. Nicht „alle Schweizer Sicherheitsunternehmen“", w: "Je enger der erste Markt, desto klarer das Produkt. „Alle Schweizer Sicherheitsunternehmen“ führt zu einem Produkt, das für niemanden richtig passt.", a: ["Aus den Interviews das Segment mit dem stärksten Schmerz identifizieren","Nach Grösse, Einsatzart und Region eingrenzen","Segment in einem Satz formulieren","Ausschlussgruppen benennen: für wen ausdrücklich nicht","Prüfen: reicht dieses Segment wirtschaftlich?"], f: "Ein Satz, der das erste Zielsegment beschreibt, abgeleitet aus konkreten Gesprächen und nicht aus Vermutung." },
      { id: "s12", t: "Kernproblem formulieren", d: "Ein Satz, aus den Interviews abgeleitet", w: "Das Kernproblem ist nicht, was du für interessant hältst, sondern was in den Interviews wiederholt genannt wurde. Es muss aus den Notizen belegbar sein.", a: ["Alle Interviewnotizen nach genannten Problemen durchgehen","Häufigkeit und Schweregrad gewichten","Ein Problem als Kern benennen, nicht drei","In einem Satz formulieren, ohne Lösungsbegriffe","Gegenprobe: welches Gespräch belegt diesen Satz?"], f: "Ein Satz, zu dem du mindestens drei Interviewnotizen als Beleg nennen kannst." },
      { id: "s13", t: "Nutzenversprechen festlegen", d: "Was der Kunde bekommt, nicht welche Technik drinsteckt", w: "Das Nutzenversprechen beschreibt, was der Kunde bekommt — nicht, welche Technik verbaut ist. „Moderne Plattform mit GPS und NFC“ ist kein Versprechen, sondern eine Merkmalsliste.", a: ["Formulieren aus Kundensicht, nicht aus Systemsicht","Ergebnis beschreiben, nicht Funktionen","Prüfen: würde ein Geschäftsführer den Satz verstehen und nicken?","An zwei bis drei Interviewpartnern testen","Umformulieren, wenn Erklärungsbedarf entsteht"], f: "Ein Satz, den ein Geschäftsführer ohne Rückfrage versteht." },
      { id: "s14", t: "Produktgrenze bestimmen", d: "Vor allem: was ausdrücklich nicht dazugehört", w: "Was nicht dazugehört, ist wichtiger als was dazugehört. Ohne klare Grenze wächst das Projekt zur ERP-Lösung und wird nie fertig.", a: ["Kernbereiche auflisten: was gehört zwingend dazu","Nicht-Ziele ausdrücklich benennen: Buchhaltung, Lohnabrechnung, ERP-Ersatz","Für jede Funktion prüfen: löst sie ein validiertes Problem?","Entscheiden, was über Schnittstellen statt eigene Funktion gelöst wird","Nicht-Ziele so aufschreiben, dass sie später zitierbar sind"], f: "Eine Liste mit Kernbereichen und eine mindestens ebenso lange Liste mit Nicht-Zielen." },
      { id: "s15", t: "GAV-Rolle entscheiden", d: "ENT-003 auflösen: Produktkern, Randbedingung oder irrelevant", w: "ENT-003 steht noch auf vorläufig. Hier wird es aufgelöst. Ob der GAV der Produktkern, eine Randbedingung oder gar nicht relevant ist, hängt allein davon ab, was die Interviews gezeigt haben — nicht davon, wie fachlich interessant das Thema ist.", a: ["Interviewnotizen zur Zeitbewertung auswerten","Frage beantworten: verarbeiten die Zielfirmen Arbeitszeiten in ihrer operativen Software oder anderswo?","Ist die heutige Zeitbewertung fehleranfällig und aufwendig?","Lösen bestehende Lohn- oder Planungssysteme das bereits?","Ist die Zeitbewertung wichtiger als Rapporte, Kontrollgänge, Kundenberichte?","Entscheidung treffen: Produktkern, Randbedingung oder irrelevant","ENT-003 im Entscheidungsprotokoll von vorläufig auf entschieden setzen"], f: "ENT-003 hat den Status entschieden und eine Begründung, die auf Interviewergebnisse verweist." },
      { id: "s16", t: "GAV-Regelmatrix erstellen", d: "Art. 8, 12, 13, 14, 15, 18, 19, 20 und Anhang 1", w: "Nur relevant, wenn ENT-003 den GAV als Kern oder Randbedingung bestätigt hat. Die Matrix übersetzt Rechtstext in Berechnungslogik. Ohne sie ist keine belastbare Produktdefinition möglich.", a: ["Art. 8 — Anstellungskategorien, Jahreskontrolle, Überschreitungen","Art. 12 — Arbeitszeit, Zeitbonus, Standortwechsel, Abrechnungspflicht","Art. 13 — Pausen und deren Anrechnung","Art. 14 — Mehr- und Unterzeit, Zeitzuschlag, Höchstarbeitszeit","Art. 15 — freie Tage","Art. 18 — Auslagenersatz, Fahrzeit, Zonen","Art. 19 — Zuschläge für Fachausweis, Diensthund, Schusswaffe","Art. 20 — Ferien","Anhang 1 — Mindestlöhne, versioniert und kantonsbezogen bei Kategorie C","Pro Regel erfassen: Eingaben, Ergebnis, Ausnahmen, Konfigurierbarkeit, Auslegungsbedarf, Testfälle"], f: "90-gav/regelmatrix.md ist für alle neun Bereiche ausgefüllt." },
      { id: "s17", t: "Auslegungsregister führen", d: "Offene Punkte vor produktiver Berechnung klären lassen", w: "Fünf Auslegungsfragen sind bereits offen. Sie werden mehr. Jeder ungeklärte Punkt ist ein potenzieller Rechnungsfehler beim Kunden — mit Lohnnachzahlungen und Konventionalstrafen bis 100'000 Franken als Folge.", a: ["Beim Ausfüllen der Regelmatrix jede Unklarheit sofort eintragen","Vorläufige Annahme dokumentieren, aber als Annahme kennzeichnen","Betroffene Testfälle verknüpfen","Anfrage an die PaKo vorbereiten und bündeln","Antworten mit Datum und Gültigkeit eintragen","Regel einhalten: keine produktive Berechnung auf ungeklärter Annahme"], f: "Jeder Eintrag hat einen Status. Für die offenen ist eine Anfrage formuliert oder abgesendet." },
      { id: "s18", t: "Grundsatz Zeitengine", d: "Rohdaten, assistiert oder verbindlich. Haftung mitentscheiden", w: "Die folgenreichste technische Entscheidung des Projekts. Sie bestimmt Haftung, Testaufwand und Wert des Produkts gleichzeitig.", a: ["Variante A prüfen: nur Rohdaten speichern, Berechnung extern","Variante B prüfen: assistierte Berechnung mit administrativer Freigabe","Variante C prüfen: verbindliche Berechnung","Haftungsfolgen je Variante durchdenken","Testaufwand je Variante abschätzen","Berücksichtigen: eine Freigabe durch die Administration wird in der Praxis oft zum Klick","Bei assistierter Berechnung: Korrekturerfassung als Zweck der Pilotphase einplanen","Entscheidung im Entscheidungsprotokoll festhalten"], f: "Eine begründete Entscheidung mit ausdrücklicher Aussage zur Haftung." },
      { id: "s19", t: "MVP definieren", d: "Kleinstes verkaufbares Produkt mit Erfolgs- und Ausschlusskriterien", w: "Der MVP ist das kleinste Produkt, das jemand kaufen würde — nicht die erste Version des Zielprodukts. Ohne Ausschlusskriterien wächst er während der Entwicklung.", a: ["Funktionen des MVP auflisten","Ausdrücklich benennen, was nicht im MVP ist","Notwendige Rollen und Daten bestimmen","Erfolgskriterien festlegen: woran misst du, ob es funktioniert","Ausschlusskriterien festlegen: wann gilt der Pilot als gescheitert","Testdauer und Pilotumfang bestimmen"], f: "Ein MVP-Dokument mit Funktionsliste, Nicht-Zielen, messbaren Erfolgskriterien und Pilotplan." },
    ],
    gateTitle: "GATE 2", gateText: "Produkt, Zielgruppe und MVP-Scope sind definiert. Wir dürfen das Lösungsdesign ausarbeiten.",
  },
  {
    id: "p3", num: "03", title: "LÖSUNGSDESIGN", sub: "Datenmodell, Architektur und Bedienung gemeinsam",
    angle: 35, color: "#34d399",
    steps: [
      { id: "s20", t: "Nutzerrollen definieren", d: "Geschäftsführung bis operativer Mitarbeiter und Kunde", w: "Eine Funktion, die aus Administrationssicht sinnvoll wirkt, kann im Nachtdienst unbrauchbar sein. Die Rollentrennung verhindert, dass nur für eine Perspektive gebaut wird.", a: ["Rollen benennen: Geschäftsführung, Administration, Einsatzleitung, Disposition, operativer Mitarbeiter, Kunde, Systemadministrator","Pro Rolle die typischen Aufgaben beschreiben","Berechtigungen skizzieren: wer sieht was, wer darf was ändern","Prüfen: welche Rolle wird beim Entwurf am ehesten vergessen"], f: "Eine Rollenübersicht mit Aufgaben und groben Berechtigungen." },
      { id: "s21", t: "Zentrale Entitäten definieren", d: "Regelwerk als eigene Entität mit Gültigkeitszeitraum", w: "Die Entitäten bestimmen, was das System überhaupt abbilden kann. Fehler hier sind später teuer zu korrigieren.", a: ["Zentrale Entitäten auflisten: Unternehmen, Mitarbeiter, Kunde, Objekt, Auftrag, Einsatz, Rapport","Regelwerk als eigene Entität mit Gültigkeitszeitraum vorsehen","Beziehungen skizzieren","Prüfen: lässt sich jede Anforderung aus der Regelmatrix abbilden?","Audit-Eintrag als eigene Entität berücksichtigen"], f: "Ein konzeptionelles Entitätenmodell, das gegen die Regelmatrix geprüft wurde." },
      { id: "s22", t: "Zeitmodell entwerfen", d: "Nie nur einen Stundenwert speichern. Rohzeit, Bonus, Zuschlag getrennt", w: "Der kritischste Teil des Datenmodells. Wer nur einen fertigen Stundenwert speichert, kann später nicht mehr nachweisen, wie er zustande kam — was der GAV ausdrücklich verlangt.", a: ["Unterscheiden: geplante Zeit, Rohzeit, Pause, anrechenbare Pause, effektive Arbeitszeit","Zeitbonus und Zeitzuschlag getrennt führen","Fahrzeit als Arbeitszeit von Fahrzeit als Entschädigung trennen","Freigegebene und exportierte Zeit als eigene Zustände","Jede Berechnung gegen ein versioniertes Regelwerk durchführen","Sicherstellen: eine spätere Regeländerung verändert alte Abrechnungen nicht rückwirkend","Berechnungsprotokoll statt Blackbox"], f: "Ein Zeitmodell, bei dem jede Zahl bis zur Rohzeit und zur angewendeten Regel zurückverfolgbar ist." },
      { id: "s23", t: "UX und Abläufe skizzieren", d: "Nachts, mit Handschuhen, schlechtes Netz, altes Smartphone", w: "Die App wird nachts benutzt, mit Handschuhen, bei schlechtem Netz, teils von Leuten mit wenig technischer Erfahrung und alten Geräten. Ein Entwurf am Schreibtisch übersieht das zuverlässig.", a: ["Mitarbeiterflow: Dienste sehen, Einsatz starten, Rapport erfassen, Pause dokumentieren, Einsatz beenden","Administrationsflow: Zeiten prüfen, Abweichungen sehen, freigeben, exportieren","Kundenflow: freigegebene Rapporte und Leistungsnachweise","Grosse Ziele, wenige Eingaben, klare Zustände","Offline-Verhalten pro Flow durchdenken","Wireframes auf einem alten Gerät ansehen"], f: "Wireframes für alle drei Rollen, mit ausdrücklicher Antwort auf die Offline-Frage." },
      { id: "s24", t: "Technische Architektur wählen", d: "Erst jetzt. Offline, NFC, GPS, Mandantenfähigkeit", w: "Erst jetzt. Wer die Architektur zuerst wählt, entscheidet Produktfragen versehentlich technisch.", a: ["Web-App, PWA oder native App entscheiden","Offline-Synchronisierung konzipieren","NFC-, GPS- und Push-Anforderungen klären","Mandantenfähigkeit und Rollenmodell technisch","Datenbank, Hosting, Backup, Monitoring","Audit-Logging und Verschlüsselung","Prüfen: erfüllt jede Wahl die Anforderungen aus Datenschutz und GAV-Aufbewahrung?"], f: "Eine Architekturentscheidung mit Begründung je Wahl." },
      { id: "s25", t: "Haftung und Compliance klären", d: "Wer gibt frei, wer haftet, wer validiert die Regellogik", w: "Wenn die Software rechnet, entsteht Haftung. Das muss vertraglich und organisatorisch geregelt sein, bevor Code entsteht — nicht nachdem der erste Kunde falsch abgerechnet hat.", a: ["Festlegen: ist die Berechnung Empfehlung oder verbindlich?","Wer gibt Zeiten frei und mit welcher Prüfmöglichkeit?","Welche Prüfpflicht bleibt beim Arbeitgeber?","Welche Vertragsklauseln braucht es?","Wer validiert die GAV-Logik fachlich?","Wie werden Regeländerungen eingespielt und alte Abrechnungen geschützt?","Datenschutz: GPS, Mitarbeitertracking, Aufbewahrungsfristen"], f: "Ein Dokument, das jede dieser Fragen beantwortet, geprüft von jemandem mit juristischer Qualifikation." },
      { id: "s26", t: "Testbibliothek erstellen", d: "Vor der Entwicklung. Sollwerte brauchen eine fachliche Autorität", w: "Vor der Entwicklung, nicht danach. Der schwierige Teil ist nicht der Testfall, sondern der Sollwert — und der lässt sich bei ungeklärten Auslegungsfragen gar nicht festlegen.", a: ["Testfälle aus der Regelmatrix ableiten","Schichten über Mitternacht, Wochenendwechsel, Feiertage","Pausen innerhalb und ausserhalb des Objekts","Monatsstunden knapp unter und über der Schwelle","Kategoriewechsel, unterjähriger Ein- und Austritt","Kombination mehrerer Zuschläge","Pro Fall festlegen, wer den Sollwert fachlich verantwortet","Fälle mit ungeklärter Auslegung als ANNAHME markieren"], f: "Jeder Testfall hat einen Sollwert und eine benannte fachliche Autorität, oder ist als ANNAHME gekennzeichnet." },
    ],
    gateTitle: "GATE 3", gateText: "Das Lösungsdesign ist für den MVP ausreichend vollständig und konsistent. Wir dürfen die Entwicklung planen.",
  },
  {
    id: "p4", num: "04", title: "ENTWICKLUNG", sub: "Erst jetzt Code",
    angle: 110, color: "#f472b6",
    steps: [
      { id: "s27", t: "Entwicklungsplan erstellen", d: "Reihenfolge, Akzeptanzkriterien, Definition of Done", w: "Reihenfolge verhindert, dass alles gleichzeitig halb fertig ist. Ohne Definition of Done gilt Code als fertig, sobald er läuft.", a: ["Entwicklungsreihenfolge festlegen: Stammdaten vor Einsätzen vor Zeitbewertung","Akzeptanzkriterien pro Baustein","Definition of Done festlegen","Teststrategie bestimmen","Pilotumfang festlegen","Rückfall- und Abbruchmöglichkeiten definieren"], f: "Ein Entwicklungsplan mit Reihenfolge, Akzeptanzkriterien und Definition of Done." },
      { id: "s28", t: "Repository-Regeln festlegen", d: "Branches, Pull Requests, kein ungeprüfter Push auf main", w: "Ohne Regeln landet ungeprüfter Code auf main. Bei einem System, das Löhne beeinflusst, ist das keine Stilfrage.", a: ["Branch-Struktur festlegen: main, develop, feature, fix","Pull Requests für jede grössere Änderung","Kein direkter Push auf main","Review-Regeln bestimmen","Umgang mit Secrets und Zugangsdaten klären"], f: "Repository-Regeln sind dokumentiert und technisch durchgesetzt, soweit möglich." },
      { id: "s29", t: "Regeln für Coding Agents", d: "CLAUDE.md — erst relevant, wenn ein Agent das Repo tatsächlich liest", w: "Erst relevant, wenn ein Coding Agent das Repository tatsächlich liest. Vorher ist es Infrastruktur für eine Entwicklung, die noch nicht freigegeben ist.", a: ["CLAUDE.md anlegen mit Projektregeln","Vorgabe: keine neuen Funktionen ohne Scope-Entscheidung","Vorgabe: keine eigenständige Interpretation von GAV-Regeln","Vorgabe: offene Auslegungen markieren statt annehmen","Vorgabe: Tests ergänzen, Dokumentation aktualisieren, Entscheidungen protokollieren","Grundsatz festhalten: generierter Code gilt als ungeprüft"], f: "CLAUDE.md liegt im Repository und wird von der eingesetzten Umgebung tatsächlich gelesen." },
      { id: "s30", t: "Pilotbetrieb", d: "Ein Unternehmen, ein Objekt, eine Einsatzart, ein Abrechnungsmonat", w: "Ein Pilot mit vollem Umfang ist kein Pilot, sondern ein Rollout mit Restrisiko. Klein anfangen macht Fehler sichtbar, bevor sie teuer werden.", a: ["Ein Unternehmen, ein Kunde, ein Objekt, eine Einsatzart","Drei bis fünf Mitarbeitende","Ein Rapporttyp, ein Abrechnungsmonat","Parallelbetrieb zum bestehenden System einplanen","Jede Korrektur der Administration erfassen — das ist der eigentliche Zweck","Wöchentliche Rückmeldung einholen"], f: "Ein abgeschlossener Pilotmonat mit vollständig erfassten Korrekturen." },
      { id: "s31", t: "Erfolg messen", d: "Vorher/nachher: Aufwand, Korrekturen, Rückfragen, Akzeptanz", w: "Ohne Messung bleibt der Nutzen Behauptung. Die Vorher-Werte müssen vor dem Pilot erhoben werden, sonst sind sie verloren.", a: ["Vorher-Werte erheben, bevor der Pilot startet","Zeit pro Rapport messen","Aufwand der Administration pro Monat","Anzahl Rückfragen und Korrekturen","Anzahl verspäteter Rapporte","Falsche Zeitberechnungen zählen","Aufwand bis zur Rechnungsgrundlage","Nutzerakzeptanz und Supportaufwand","Nachher-Werte gegenüberstellen"], f: "Eine Gegenüberstellung von Vorher und Nachher mit Zahlen, nicht mit Eindrücken." },
    ],
    gateTitle: "GATE 4", gateText: "Die Entwicklung des freigegebenen MVP-Scopes darf beginnen.",
  },
];

const KILL = [
  { id: "ab01", t: "Problem existiert nicht ausserhalb des eigenen Betriebs", g: "1" },
  { id: "ab02", t: "Keine Zahlungsbereitschaft", g: "1" },
  { id: "ab03", t: "Bestehende Lösungen decken den Bedarf", g: "1" },
  { id: "ab04", t: "Kein realistischer Wettbewerbsvorteil", g: "1/2" },
  { id: "ab05", t: "Markt wirtschaftlich zu klein", g: "1" },
  { id: "ab06", t: "Rechtliche Anforderungen unverhältnismässig", g: "1/2" },
  { id: "ab07", t: "Aufwand ohne Verhältnis zum Potenzial", g: "2/3" },
  { id: "ab08", t: "Kein Zugang zu ehrlichem Feedback", g: "1" },
  { id: "ab09", t: "Loyalitätskonflikt nicht lösbar", g: "0" },
];

const OPEN = [
  { id: "a1", q: "Art. 12.2", t: "Sonntag 23:00–24:00: Bonus einmal oder kumuliert?" },
  { id: "a2", q: "Art. 14.3", t: "210-Stunden-Schwelle auf Roh- oder bewerteter Zeit?" },
  { id: "a3", q: "Art. 12/15", t: "Massgeblicher Kanton für Feiertage bei Grenzeinsätzen" },
  { id: "a4", q: "Art. 13.2", t: "Pausenanrechnung: Objekt- oder Einsatzattribut?" },
  { id: "a5", q: "Art. 19", t: "Zusammentreffen mehrerer Zuschläge" },
];

const ALL = PHASES.flatMap((p) => p.steps.map((s) => s.id));
const KEY = "sop-roadmap-hud-v1";

/**
 * Speicher-Abstraktion.
 * Im Claude-Artefakt: window.storage (persistiert über Sitzungen).
 * In einem eigenen Vite/React-Projekt: localStorage.
 * Ohne beides: nur im Arbeitsspeicher, Stand geht beim Neuladen verloren.
 */
const store = {
  async get(key) {
    if (typeof window !== "undefined" && window.storage?.get) {
      const r = await window.storage.get(key);
      return r?.value ?? null;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  async set(key, value) {
    if (typeof window !== "undefined" && window.storage?.set) {
      await window.storage.set(key, value);
      return;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
  mode() {
    if (typeof window === "undefined") return "kein Speicher";
    if (window.storage?.get) return "Artefakt";
    if (window.localStorage) return "lokal";
    return "kein Speicher";
  },
};

export default function Roadmap() {
  const [done, setDone] = useState({});
  const [notes, setNotes] = useState({});
  const [kill, setKill] = useState({});
  const [gates, setGates] = useState({});
  const [open, setOpen] = useState("p0");
  const [expanded, setExpanded] = useState({});
  const [importMsg, setImportMsg] = useState(null);
  const [noteFor, setNoteFor] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [now, setNow] = useState(new Date());
  const [hover, setHover] = useState(null);
  const [tick, setTick] = useState(0);
  const raf = useRef();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let mounted = true;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;
    const loop = () => {
      if (!mounted) return;
      setTick((t) => t + 1);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { mounted = false; cancelAnimationFrame(raf.current); };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const raw = await store.get(KEY);
        if (raw) {
          const d = JSON.parse(raw);
          setDone(d.done || {}); setNotes(d.notes || {});
          setKill(d.kill || {}); setGates(d.gates || {});
        }
      } catch (e) { /* noch nichts gespeichert */ }
      setLoaded(true);
    })();
  }, []);

  const persist = async (next) => {
    try {
      await store.set(KEY, JSON.stringify(next));
      setSaved(true); setTimeout(() => setSaved(false), 1400);
    } catch (e) { /* Zustand bleibt im Speicher */ }
  };
  const snap = (o) => ({ done, notes, kill, gates, ...o });

  const toggle = (id) => { const n = { ...done, [id]: !done[id] }; setDone(n); persist(snap({ done: n })); };
  const setNote = (id, v) => { const n = { ...notes, [id]: v }; setNotes(n); persist(snap({ notes: n })); };
  const cycleKill = (id) => {
    const o = [undefined, "nein", "teil", "ja"];
    const n = { ...kill, [id]: o[(o.indexOf(kill[id]) + 1) % o.length] };
    setKill(n); persist(snap({ kill: n }));
  };
  const toggleGate = (id) => { const n = { ...gates, [id]: !gates[id] }; setGates(n); persist(snap({ gates: n })); };

  const exportStand = () => {
    const data = JSON.stringify({ version: 1, exported: new Date().toISOString(), done, notes, kill, gates }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `roadmap-stand-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importStand = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        const next = { done: d.done || {}, notes: d.notes || {}, kill: d.kill || {}, gates: d.gates || {} };
        setDone(next.done); setNotes(next.notes); setKill(next.kill); setGates(next.gates);
        persist(next);
        setImportMsg("Stand übernommen");
      } catch (err) {
        setImportMsg("Datei nicht lesbar");
      }
      setTimeout(() => setImportMsg(null), 3000);
    };
    r.readAsText(f);
    e.target.value = "";
  };

  const doneCount = ALL.filter((i) => done[i]).length;
  const pct = Math.round((doneCount / ALL.length) * 100);
  const current = useMemo(() => PHASES.find((p) => p.steps.some((s) => !done[s.id])) || PHASES[4], [done]);
  const flags = KILL.filter((k) => kill[k.id] === "ja" || kill[k.id] === "teil");

  const pad = (n) => String(n).padStart(2, "0");
  const DAYS = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];
  const MON = ["JAN", "FEB", "MÄR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ"];
  const greet = now.getHours() < 5 ? "Gute Nacht" : now.getHours() < 12 ? "Guten Morgen" : now.getHours() < 18 ? "Guten Tag" : "Guten Abend";

  if (!loaded) return <div style={{ minHeight: "100vh", background: "#050708", color: "#3d5a6b", display: "grid", placeItems: "center", fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em" }}>INITIALISIERE …</div>;

  // Graph-Geometrie
  const CX = 300, CY = 210, R = 132;
  const nodes = PHASES.map((p) => {
    const rad = (p.angle * Math.PI) / 180;
    const d = p.steps.filter((s) => done[s.id]).length;
    return { ...p, x: CX + Math.cos(rad) * R, y: CY + Math.sin(rad) * R, d, total: p.steps.length, complete: d === p.steps.length, active: p.id === current.id };
  });
  const pulse = 0.5 + 0.5 * Math.sin(tick / 40);

  return (
    <div style={S.page}>
      <style>{CSS}</style>

      {/* HEADER */}
      <div style={S.topbar}>
        <div style={S.topLeft}>
          <span style={S.logoDot} />
          <span style={S.logo}>SOP</span>
          <span style={S.slash}>//</span>
          <span style={S.logoSub}>PROJEKTVERLAUF</span>
        </div>
        <div style={S.topRight}>
          <span style={S.clockDate}>{DAYS[now.getDay()]} {pad(now.getDate())} {MON[now.getMonth()]} {now.getFullYear()}</span>
          <span style={S.clockTime}>{pad(now.getHours())}:{pad(now.getMinutes())}<span style={{ opacity: now.getSeconds() % 2 ? 0.3 : 1 }}>:</span>{pad(now.getSeconds())}</span>
        </div>
      </div>

      <Panel label="SESSION">
        <div style={S.greet}>{greet}. <span style={S.greetAccent}>Phase {current.num}.</span></div>
        <div style={S.greetSub}>
          {doneCount === 0
            ? "Noch nichts abgehakt. Der erste Schritt ist die Vertragsprüfung."
            : `${ALL.length - doneCount} Schritte offen. Aktuell: ${current.title.toLowerCase()}.`}
        </div>
      </Panel>

      {/* GRAPH */}
      <Panel label="PROJEKT-NEXUS" right={`${PHASES.length} PHASEN · ${ALL.length} SCHRITTE`}>
        <div style={S.graphWrap}>
          <svg viewBox="0 0 600 420" style={S.svg} role="img" aria-label={`Fortschritt ${pct} Prozent`}>
            <defs>
              <radialGradient id="core">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="3.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>

            {[R + 46, R + 12, R - 44, R - 84].map((r, i) => (
              <circle key={i} cx={CX} cy={CY} r={r} fill="none" stroke="#0f2a33" strokeWidth="1" strokeDasharray={i % 2 ? "2 7" : "none"} opacity={0.75} />
            ))}
            {[0, 45, 90, 135].map((a) => {
              const rad = (a * Math.PI) / 180;
              return <line key={a} x1={CX - Math.cos(rad) * (R + 46)} y1={CY - Math.sin(rad) * (R + 46)} x2={CX + Math.cos(rad) * (R + 46)} y2={CY + Math.sin(rad) * (R + 46)} stroke="#0c2028" strokeWidth="1" />;
            })}

            {nodes.map((n, i) => {
              const nx = nodes[(i + 1) % nodes.length];
              return <line key={"e" + i} x1={n.x} y1={n.y} x2={nx.x} y2={nx.y} stroke={n.complete ? n.color : "#12333d"} strokeWidth="1" opacity={n.complete ? 0.35 : 0.5} strokeDasharray="3 5" />;
            })}
            {nodes.map((n, i) => (
              <line key={"s" + i} x1={CX} y1={CY} x2={n.x} y2={n.y} stroke={n.color} strokeWidth={n.active ? 1.4 : 1} opacity={n.complete ? 0.5 : n.active ? 0.4 : 0.16} />
            ))}

            <circle cx={CX} cy={CY} r={78} fill="url(#core)" />
            <circle cx={CX} cy={CY} r={44} fill="none" stroke="#0e3d47" strokeWidth="1" />
            <circle
              cx={CX} cy={CY} r={44} fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 276.5} 276.5`} transform={`rotate(-90 ${CX} ${CY})`}
              style={{ filter: "url(#glow)", transition: "stroke-dasharray .6s cubic-bezier(.4,0,.2,1)" }}
            />
            <text x={CX} y={CY + 3} textAnchor="middle" style={S.coreNum}>{pct}</text>
            <text x={CX} y={CY + 22} textAnchor="middle" style={S.coreLbl}>PROZENT</text>

            {nodes.map((n) => {
              const on = hover === n.id;
              const r = n.active ? 13 + pulse * 2.5 : 11;
              return (
                <g key={n.id} onClick={() => setOpen(open === n.id ? null : n.id)}
                   onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
                  {(n.active || on) && <circle cx={n.x} cy={n.y} r={r + 11} fill={n.color} opacity={0.09} />}
                  <polygon points={hexPts(n.x, n.y, r)} fill={n.complete ? n.color : "#0a1418"} stroke={n.color} strokeWidth={n.active || on ? 2 : 1.4} opacity={n.complete || n.active || on ? 1 : 0.62} style={{ filter: n.active || on ? "url(#glow)" : "none" }} />
                  <text x={n.x} y={n.y + 3.5} textAnchor="middle" style={{ ...S.nodeNum, fill: n.complete ? "#050708" : n.color }}>{n.num}</text>
                  <text x={n.x} y={n.y + r + 15} textAnchor="middle" style={{ ...S.nodeLbl, fill: n.active || on ? n.color : "#4e6b78" }}>{n.title}</text>
                  <text x={n.x} y={n.y + r + 27} textAnchor="middle" style={{ ...S.nodeMeta, fill: n.complete ? n.color : "#33505c" }}>{n.d}/{n.total}</text>
                </g>
              );
            })}
          </svg>

          <div style={S.bars}>
            {nodes.map((n) => (
              <div key={n.id} style={S.barRow}>
                <span style={{ ...S.barLbl, color: n.active ? n.color : "#3d5a6b" }}>{n.num}</span>
                <span style={S.barTrack}><span style={{ ...S.barFill, width: `${(n.d / n.total) * 100}%`, background: n.color, boxShadow: n.d ? `0 0 6px ${n.color}` : "none" }} /></span>
                <span style={{ ...S.barVal, color: n.complete ? n.color : "#3d5a6b" }}>{n.d}/{n.total}</span>
              </div>
            ))}
          </div>
          <div style={S.status}>
            <span>NODES {PHASES.length} · STEPS {ALL.length}</span>
            <span style={{ color: saved ? "#34d399" : "#2a4652" }}>{saved ? "GESPEICHERT" : "SYNC · BEREIT"}</span>
          </div>
        </div>
      </Panel>

      {flags.length > 0 && (
        <div style={S.alert}>
          <span style={S.alertTag}>ACHTUNG</span>
          {flags.length} Abbruchkriterium{flags.length > 1 ? "en" : ""} markiert. Fortsetzung begründen und im Entscheidungsprotokoll festhalten.
        </div>
      )}

      {/* PHASEN */}
      <Panel label="PHASEN" right={`${doneCount}/${ALL.length} ERLEDIGT`}>
        {PHASES.map((p, pi) => {
          const d = p.steps.filter((s) => done[s.id]).length;
          const complete = d === p.steps.length;
          const isOpen = open === p.id;
          const locked = pi > 0 && !gates[PHASES[pi - 1].id];
          const offset = PHASES.slice(0, pi).reduce((a, x) => a + x.steps.length, 0);

          return (
            <div key={p.id} style={{ ...S.phase, borderColor: isOpen ? p.color + "44" : "#12222a" }}>
              <button onClick={() => setOpen(isOpen ? null : p.id)} style={S.phaseHead} className="ph" aria-expanded={isOpen}>
                <span style={{ ...S.phNum, color: p.color, borderColor: p.color + "55", background: complete ? p.color + "1a" : "transparent" }}>{p.num}</span>
                <span style={S.phMeta}>
                  <span style={{ ...S.phTitle, color: isOpen ? p.color : "#c8dae2" }}>{p.title}</span>
                  <span style={S.phSub}>{p.sub}</span>
                </span>
                <span style={S.phRight}>
                  {locked && <span style={S.lock}>GESPERRT</span>}
                  <span style={{ ...S.phCount, color: complete ? p.color : "#3d5a6b" }}>{d}/{p.steps.length}</span>
                  <span style={{ ...S.chev, transform: isOpen ? "rotate(90deg)" : "none", color: p.color }}>›</span>
                </span>
              </button>

              {isOpen && (
                <div style={S.phBody}>
                  {p.steps.map((s, i) => {
                    const on = !!done[s.id];
                    return (
                      <div key={s.id} style={S.step}>
                        <button onClick={() => toggle(s.id)} className="bx"
                          style={{ ...S.box, borderColor: on ? p.color : "#1e3a44", background: on ? p.color + "22" : "transparent" }}
                          aria-label={on ? "Als offen markieren" : "Als erledigt markieren"}>
                          {on && <span style={{ ...S.tick, color: p.color }}>✓</span>}
                        </button>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <button onClick={() => setExpanded({ ...expanded, [s.id]: !expanded[s.id] })}
                            style={S.stepHeadBtn} className="sh" aria-expanded={!!expanded[s.id]}>
                            <span style={{ ...S.stepNum, color: on ? p.color : "#2e4a56" }}>{pad(offset + i + 1)}</span>
                            <span style={{ ...S.stepT, color: on ? "#3d5a6b" : "#d5e5ec", textDecoration: on ? "line-through" : "none" }}>{s.t}</span>
                            <span style={{ ...S.stepChev, color: p.color, transform: expanded[s.id] ? "rotate(90deg)" : "none" }}>›</span>
                          </button>
                          <div style={S.stepD}>{s.d}</div>

                          {expanded[s.id] && (
                            <div style={{ ...S.detail, borderLeftColor: p.color + "55" }}>
                              <div style={S.detBlock}>
                                <div style={{ ...S.detLbl, color: p.color }}>WARUM</div>
                                <div style={S.detTxt}>{s.w}</div>
                              </div>
                              <div style={S.detBlock}>
                                <div style={{ ...S.detLbl, color: p.color }}>KONKRET ZU TUN</div>
                                <ul style={S.detList}>
                                  {s.a.map((x, j) => (
                                    <li key={j} style={S.detLi}>
                                      <span style={{ ...S.detBullet, color: p.color }}>▸</span>
                                      <span>{x}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div style={{ ...S.detDone, borderColor: p.color + "33", background: p.color + "0a" }}>
                                <div style={{ ...S.detLbl, color: p.color, marginBottom: 4 }}>FERTIG, WENN</div>
                                <div style={S.detTxt}>{s.f}</div>
                              </div>
                            </div>
                          )}

                          {noteFor === s.id ? (
                            <textarea autoFocus value={notes[s.id] || ""} onChange={(e) => setNote(s.id, e.target.value)}
                              onBlur={() => setNoteFor(null)} placeholder="Notiz, Datum, Ergebnis …"
                              style={{ ...S.ta, borderColor: p.color + "44" }} />
                          ) : notes[s.id] ? (
                            <button onClick={() => setNoteFor(s.id)} className="lk" style={{ ...S.noteOn, borderLeftColor: p.color }}>{notes[s.id]}</button>
                          ) : (
                            <button onClick={() => setNoteFor(s.id)} className="lk" style={S.noteAdd}>+ NOTIZ</button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ ...S.gate, borderColor: gates[p.id] ? p.color + "55" : "#152b34", background: gates[p.id] ? p.color + "0d" : "#070d10" }}>
                    <button onClick={() => toggleGate(p.id)} className="bx"
                      style={{ ...S.box, borderColor: gates[p.id] ? p.color : "#1e3a44", background: gates[p.id] ? p.color + "22" : "transparent" }}>
                      {gates[p.id] && <span style={{ ...S.tick, color: p.color }}>✓</span>}
                    </button>
                    <div>
                      <div style={{ ...S.gateT, color: p.color }}>{p.gateTitle} · FREIGABE</div>
                      <div style={S.gateTxt}>„{p.gateText}“</div>
                      {!complete && !gates[p.id] && <div style={S.gateWarn}>{p.steps.length - d} Schritte offen</div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Panel>

      {/* ABBRUCH */}
      <Panel label="ABBRUCHKRITERIEN" right="TIPPEN ZUM WECHSELN">
        <div style={S.cardLede}>Offen → nicht erfüllt → teilweise → erfüllt. Ziel ist die ehrliche Validierung, nicht die Bestätigung der Idee.</div>
        {KILL.map((k) => {
          const v = kill[k.id];
          const c = v === "ja" ? "#f87171" : v === "teil" ? "#f0b429" : v === "nein" ? "#34d399" : "#2a4652";
          const l = v === "ja" ? "ERFÜLLT" : v === "teil" ? "TEILWEISE" : v === "nein" ? "NICHT ERF." : "OFFEN";
          return (
            <button key={k.id} onClick={() => cycleKill(k.id)} className="kr" style={S.killRow}>
              <span style={{ ...S.dot, background: c, boxShadow: v && v !== "nein" ? `0 0 7px ${c}` : "none" }} />
              <span style={S.killT}>{k.t}</span>
              <span style={S.killG}>G{k.g}</span>
              <span style={{ ...S.killS, color: c }}>{l}</span>
            </button>
          );
        })}
      </Panel>

      {/* GAV */}
      <Panel label="OFFENE GAV-AUSLEGUNGEN" right="5 UNGEKLÄRT">
        <div style={S.cardLede}>Vor jeder produktiven Berechnung verbindlich zu klären. Eine vorläufige Annahme darf nie stillschweigend zur Implementierungsgrundlage werden.</div>
        {OPEN.map((o) => (
          <div key={o.id} style={S.openRow}>
            <span style={S.openQ}>{o.q}</span>
            <span style={S.openT}>{o.t}</span>
          </div>
        ))}
        <div style={S.cardFoot}>VOLLSTÄNDIG IN 90-gav/auslegungsregister.md</div>
      </Panel>

      <Panel label="STAND SICHERN" right={`SPEICHER · ${store.mode().toUpperCase()}`}>
        <div style={S.cardLede}>
          Der Fortschritt liegt in der jeweiligen Umgebung. Zum Übertragen — etwa vom Artefakt in eine
          eigene Installation — den Stand als Datei exportieren und dort wieder einlesen.
        </div>
        <div style={S.ioRow}>
          <button onClick={exportStand} style={S.ioBtn} className="io">↓ EXPORTIEREN</button>
          <label style={S.ioBtn} className="io">
            ↑ EINLESEN
            <input type="file" accept="application/json,.json" onChange={importStand} style={{ display: "none" }} />
          </label>
          {importMsg && <span style={S.ioMsg}>{importMsg}</span>}
        </div>
      </Panel>

      <div style={S.foot}>
        <span style={S.footLine} />
        Das Repository dokumentiert das Projekt. Die Interviews entscheiden, ob es eines gibt.
        <span style={S.footLine} />
      </div>
    </div>
  );
}

function hexPts(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

function Panel({ label, right, children }) {
  return (
    <section style={S.panel}>
      <span style={{ ...S.corner, top: -1, left: -1, borderWidth: "1px 0 0 1px" }} />
      <span style={{ ...S.corner, top: -1, right: -1, borderWidth: "1px 1px 0 0" }} />
      <span style={{ ...S.corner, bottom: -1, left: -1, borderWidth: "0 0 1px 1px" }} />
      <span style={{ ...S.corner, bottom: -1, right: -1, borderWidth: "0 1px 1px 0" }} />
      <div style={S.panelHead}>
        <span style={S.panelDot} />
        <span style={S.panelLbl}>// {label}</span>
        {right && <span style={S.panelRight}>{right}</span>}
      </div>
      <div style={S.panelBody}>{children}</div>
    </section>
  );
}

const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const CSS = `
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  .ph:hover { background: rgba(34,211,238,.04) !important; }
  .bx:hover { filter: brightness(1.5); }
  .kr:hover { background: rgba(34,211,238,.04) !important; }
  .lk:hover { color: #22d3ee !important; }
  .sh:hover { opacity: .78; }
  .io:hover { background: rgba(34,211,238,.12) !important; border-color: rgba(34,211,238,.5) !important; }
  textarea:focus, button:focus-visible { outline: 1px solid #22d3ee; outline-offset: 2px; }
  ::selection { background: #22d3ee44; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
`;

const S = {
  page: { minHeight: "100vh", background: "radial-gradient(ellipse at 50% 0%, #071319 0%, #050708 55%)", color: "#c8dae2", fontFamily: SANS, padding: "14px 12px 44px", maxWidth: 720, margin: "0 auto" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px 14px", borderBottom: "1px solid #0e2129", marginBottom: 14, flexWrap: "wrap", gap: 8 },
  topLeft: { display: "flex", alignItems: "center", gap: 8 },
  logoDot: { width: 9, height: 9, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 9px #22d3ee" },
  logo: { fontFamily: MONO, fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", color: "#e8f4f8" },
  slash: { fontFamily: MONO, fontSize: 12, color: "#1e4652" },
  logoSub: { fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.2em", color: "#3d5a6b" },
  topRight: { display: "flex", alignItems: "baseline", gap: 10 },
  clockDate: { fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "#3d5a6b" },
  clockTime: { fontFamily: MONO, fontSize: 13, letterSpacing: "0.06em", color: "#22d3ee" },

  panel: { position: "relative", background: "linear-gradient(180deg, rgba(9,20,26,.85), rgba(6,12,15,.85))", border: "1px solid #0e2129", borderRadius: 3, marginBottom: 10 },
  corner: { position: "absolute", width: 9, height: 9, borderStyle: "solid", borderColor: "#22d3ee", opacity: 0.5, pointerEvents: "none" },
  panelHead: { display: "flex", alignItems: "center", gap: 7, padding: "9px 13px", borderBottom: "1px solid #0c1c23" },
  panelDot: { width: 6, height: 6, background: "#1a4a58", borderRadius: 1 },
  panelLbl: { fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.2em", color: "#4e7a8a", flex: 1 },
  panelRight: { fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.14em", color: "#2a4652" },
  panelBody: { padding: 13 },

  greet: { fontSize: 22, fontWeight: 300, letterSpacing: "-0.01em", color: "#e8f4f8", marginBottom: 5 },
  greetAccent: { color: "#22d3ee", fontStyle: "italic", fontWeight: 400 },
  greetSub: { fontFamily: MONO, fontSize: 11, color: "#4e7a8a", lineHeight: 1.6 },

  graphWrap: { position: "relative" },
  svg: { width: "100%", height: "auto", display: "block" },
  coreNum: { fontFamily: MONO, fontSize: 27, fontWeight: 700, fill: "#22d3ee", letterSpacing: "-0.02em" },
  coreLbl: { fontFamily: MONO, fontSize: 7, fill: "#2a5563", letterSpacing: "0.28em" },
  nodeNum: { fontFamily: MONO, fontSize: 9.5, fontWeight: 700 },
  nodeLbl: { fontFamily: MONO, fontSize: 8, letterSpacing: "0.12em" },
  nodeMeta: { fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.08em" },

  bars: { display: "flex", flexDirection: "column", gap: 4, padding: "10px 2px 0", borderTop: "1px solid #0c1c23", marginTop: 4 },
  barRow: { display: "flex", alignItems: "center", gap: 9 },
  barLbl: { fontFamily: MONO, fontSize: 8.5, minWidth: 16, letterSpacing: "0.1em" },
  barTrack: { flex: 1, height: 2, background: "#0e2129", borderRadius: 1, overflow: "hidden" },
  barFill: { display: "block", height: "100%", transition: "width .45s cubic-bezier(.4,0,.2,1)" },
  barVal: { fontFamily: MONO, fontSize: 8.5, minWidth: 26, textAlign: "right" },
  status: { display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 8, letterSpacing: "0.14em", color: "#2a4652", paddingTop: 9, marginTop: 8, borderTop: "1px solid #0c1c23" },

  alert: { display: "flex", alignItems: "center", gap: 9, background: "rgba(240,180,41,.06)", border: "1px solid rgba(240,180,41,.22)", borderRadius: 3, padding: "10px 13px", fontSize: 12, lineHeight: 1.5, color: "#d4b877", marginBottom: 10 },
  alertTag: { fontFamily: MONO, fontSize: 8, letterSpacing: "0.18em", color: "#f0b429", border: "1px solid rgba(240,180,41,.35)", borderRadius: 2, padding: "2px 5px", whiteSpace: "nowrap" },

  phase: { border: "1px solid #12222a", borderRadius: 3, marginBottom: 5, overflow: "hidden", transition: "border-color .2s", background: "rgba(6,14,18,.5)" },
  phaseHead: { width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "11px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", transition: "background .15s" },
  phNum: { fontFamily: MONO, fontSize: 10, fontWeight: 700, border: "1px solid", borderRadius: 2, padding: "3px 5px", minWidth: 26, textAlign: "center" },
  phMeta: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 },
  phTitle: { fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.09em", transition: "color .2s" },
  phSub: { fontSize: 11, color: "#3d5a6b", lineHeight: 1.35 },
  phRight: { display: "flex", alignItems: "center", gap: 8 },
  lock: { fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.12em", color: "#2a4652", border: "1px solid #16303a", borderRadius: 2, padding: "2px 4px" },
  phCount: { fontFamily: MONO, fontSize: 9.5 },
  chev: { fontSize: 16, transition: "transform .2s", display: "inline-block", lineHeight: 1, opacity: 0.7 },
  phBody: { padding: "0 12px 12px", borderTop: "1px solid #0c1c23" },

  step: { display: "flex", gap: 11, padding: "11px 0", borderBottom: "1px solid #0b171d" },
  box: { width: 16, height: 16, minWidth: 16, marginTop: 2, borderRadius: 2, border: "1px solid", cursor: "pointer", display: "grid", placeItems: "center", padding: 0, transition: "all .15s" },
  tick: { fontSize: 10, lineHeight: 1 },
  stepHead: { display: "flex", gap: 8, alignItems: "baseline", marginBottom: 3 },
  stepHeadBtn: { display: "flex", gap: 8, alignItems: "baseline", marginBottom: 3, width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", transition: "opacity .15s" },
  stepNum: { fontFamily: MONO, fontSize: 9, minWidth: 15 },
  stepT: { fontSize: 13, fontWeight: 500, lineHeight: 1.35, flex: 1 },
  stepChev: { fontSize: 15, lineHeight: 1, transition: "transform .2s", display: "inline-block", opacity: 0.55 },
  detail: { marginLeft: 23, marginTop: 10, paddingLeft: 12, borderLeft: "2px solid", display: "flex", flexDirection: "column", gap: 12 },
  detBlock: {},
  detLbl: { fontFamily: MONO, fontSize: 8, letterSpacing: "0.2em", marginBottom: 5, opacity: 0.85 },
  detTxt: { fontSize: 12, lineHeight: 1.6, color: "#8fb0bd" },
  detList: { margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 },
  detLi: { display: "flex", gap: 7, fontSize: 12, lineHeight: 1.5, color: "#8fb0bd" },
  detBullet: { fontSize: 8, lineHeight: 1.8, opacity: 0.7, minWidth: 8 },
  detDone: { border: "1px solid", borderRadius: 2, padding: "9px 11px" },
  stepD: { fontSize: 11.5, lineHeight: 1.5, color: "#456876", paddingLeft: 23 },
  ta: { width: "calc(100% - 23px)", marginLeft: 23, marginTop: 7, background: "#050b0e", border: "1px solid", borderRadius: 2, color: "#c8dae2", fontSize: 12, fontFamily: SANS, padding: "7px 9px", minHeight: 54, resize: "vertical" },
  noteAdd: { marginTop: 6, marginLeft: 23, background: "none", border: "none", color: "#2a4652", fontSize: 9, fontFamily: MONO, letterSpacing: "0.14em", cursor: "pointer", padding: 0, transition: "color .15s" },
  noteOn: { marginTop: 7, marginLeft: 23, width: "calc(100% - 23px)", background: "rgba(8,18,23,.7)", border: "1px solid #12222a", borderLeft: "2px solid", borderRadius: "0 2px 2px 0", color: "#7fa0ad", fontSize: 12, fontFamily: SANS, padding: "7px 9px", cursor: "pointer", textAlign: "left", lineHeight: 1.5, transition: "color .15s" },

  gate: { display: "flex", gap: 11, marginTop: 12, padding: "12px", border: "1px solid", borderRadius: 3, transition: "all .2s" },
  gateT: { fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.18em", marginBottom: 5 },
  gateTxt: { fontSize: 12, lineHeight: 1.55, color: "#a8c2cd", fontStyle: "italic" },
  gateWarn: { fontFamily: MONO, fontSize: 9, color: "#3d5a6b", marginTop: 6, letterSpacing: "0.08em" },

  cardLede: { fontSize: 11.5, lineHeight: 1.55, color: "#456876", marginBottom: 11 },
  killRow: { width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 5px", background: "transparent", border: "none", borderRadius: 2, cursor: "pointer", textAlign: "left", transition: "background .15s" },
  dot: { width: 6, height: 6, minWidth: 6, borderRadius: "50%" },
  killT: { flex: 1, fontSize: 12, color: "#a8c2cd", lineHeight: 1.35 },
  killG: { fontFamily: MONO, fontSize: 8.5, color: "#2a4652" },
  killS: { fontFamily: MONO, fontSize: 8.5, minWidth: 66, textAlign: "right", letterSpacing: "0.08em" },

  openRow: { display: "flex", gap: 10, padding: "9px 0", borderTop: "1px solid #0b171d", alignItems: "baseline" },
  openQ: { fontFamily: MONO, fontSize: 9, color: "#22d3ee", minWidth: 56, letterSpacing: "0.06em", opacity: 0.75 },
  openT: { fontSize: 12, color: "#a8c2cd", lineHeight: 1.45 },
  cardFoot: { fontFamily: MONO, fontSize: 8.5, color: "#2a4652", marginTop: 11, paddingTop: 9, borderTop: "1px solid #0b171d", letterSpacing: "0.1em" },

  ioRow: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  ioBtn: { fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "#22d3ee", background: "rgba(34,211,238,.05)", border: "1px solid rgba(34,211,238,.28)", borderRadius: 2, padding: "8px 12px", cursor: "pointer", transition: "all .15s" },
  ioMsg: { fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", color: "#34d399" },
  foot: { display: "flex", alignItems: "center", gap: 12, fontFamily: MONO, fontSize: 9.5, color: "#2a4652", textAlign: "center", marginTop: 22, lineHeight: 1.6, letterSpacing: "0.04em" },
  footLine: { flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #12222a, transparent)" },
};
