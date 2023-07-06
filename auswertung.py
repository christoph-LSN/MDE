import pandas as pd
import matplotlib.pyplot as plt
from urllib.request import urlopen

# Daten laden aus Datei
url = "https://christoph-lsn.github.io/IM_Data/de/data/1-1-1.csv"
data = pd.read_csv(urlopen(url))

# Filter für Niedersachsen erstellen
niedersachsen = data[data['Gebietseinheit'].str.contains('Niedersachsen')]

# Filter für die ausgeschlossenen Regionen erstellen
ausgeschlossene_regionen = ['Statistische Region Braunschweig', 
                           'Statistische Region Weser-Ems', 
                           'Statistische Region Lüneburg', 
                           'Statistische Region Hannover']
niedersachsen = niedersachsen[~niedersachsen['Gebietseinheit'].isin(ausgeschlossene_regionen)]

# Zeitreihenplot erstellen
plt.plot(niedersachsen['Jahr'], niedersachsen['Wert'])
plt.xlabel('Jahr')
plt.ylabel('Wert')
plt.title('Entwicklung des Werts in Niedersachsen im Zeitverlauf')
plt.savefig('zeitverlauf.png')
plt.close()

# Minimum- und Maximum-Werte der einzelnen Kreise im Zeitverlauf berechnen
min_werte = niedersachsen.groupby('Gebietseinheit')['Wert'].min()
max_werte = niedersachsen.groupby('Gebietseinheit')['Wert'].max()

# Datenblatt erstellen
ergebnisse = pd.DataFrame({'Minimum': min_werte, 'Maximum': max_werte})
ergebnisse = ergebnisse.reset_index()

# Webseite erstellen
html_template = """
<!DOCTYPE html>
<html>
<head>
<title>Statistische Auswertung</title>
</head>
<body>
<h1>Statistische Auswertung der Daten</h1>

<h2>Entwicklung des Werts in Niedersachsen im Zeitverlauf</h2>
<img src="zeitverlauf.png">

<h2>Minimum- und Maximum-Werte der einzelnen Kreise in Niedersachsen</h2>
{table}

</body>
</html>
"""

table_html = ergebnisse.to_html(index=False)
html_content = html_template.format(table=table_html)

# Webseite als HTML-Datei speichern
with open('statistische_auswertung.html', 'w') as f:
    f.write(html_content)
