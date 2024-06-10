import pandas as pd

df = pd.read_csv("smartphone_cleaned_v5.csv")

### PULIZIA DEL DATASET ###

## ELIMINARE LE RIGHE DOVE IL BRAND_NAME È "NOTHING"
brand = "brand_name"
df = df[df[brand] != 'nothing']


## CONVERSIONE DEL PREZZO IN EURO (VALORE DI CONVERSIONE AGGIORNATO AL 9 GIUGNO 2024)
prezzo = "price"
df[prezzo] = (df[prezzo] * 0.011).round(2)


## NORMALIZZAZIONE DELLA COLONNA RATING IN DECIMI

# Definizione degli intervalli per le stelle
intervalli_stelle = [60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90]

# Etichette delle stelle
etichette_stelle = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

# Applicazione della normalizzazione utilizzando la funzione cut
rating = "rating"
df[rating] = pd.cut(df[rating], bins=intervalli_stelle, labels=etichette_stelle, right=False)


