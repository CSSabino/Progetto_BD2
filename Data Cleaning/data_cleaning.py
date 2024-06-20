import pandas as pd

df = pd.read_csv("smartphone_cleaned_v5.csv")

### PULIZIA DEL DATASET ###

##.1 ELIMINAZIONE DELLE COLONNE RITENUTE MENO INTERESSANTI DA VISUALIZZARE
df = df.drop(['fast_charging', 'extended_upto'], axis=1)


##.2 ELIMINAZIONE DELLE RIGHE IN CORRISPONDENZA DI VALORI MANCANTI NELLE COLONNE IN CUI SI PRESENTANO
df = df.dropna(subset=['processor_brand', 'rating', 'num_cores',
                       'processor_speed', 'battery_capacity', 'num_front_cameras',
                       'primary_camera_front', 'os'])


##.3 ELIMINAZIONE DELLE RIGHE IN CORRISPONDENZA DEL VALORE "nothing" NELLA COLONNA "brand_name"
df = df[df['brand_name'] != 'nothing']


##.4 ELIMINAZIONE DELLE RIGHE IN CORRISPONDENZA DEL VALORE "other" NELLA COLONNA "os"
df = df[df['os'] != 'other']


##.5 ELIMINAZIONE DELLE RIGHE IN CORRISPONDENZA DI MODELLI DI CELLULARI SCONOSCIUTI O RILASCIATI PRIMA DEL 2019
models_to_delete = ['OnePlus 6 (8GB RAM + 128GB)', 'Google Pixel 2 XL', 'OnePlus Nord 3T 5G', 'Vivo Y71',
                        'Apple iPhone 7s', 'OnePlus Nord Lite', 'OPPO Reno 9 Z', 'OnePlus Nord 5', 'Samsung Galaxy A83 5G',
                        'OPPO X 2021', 'Vivo T3 Pro', 'Huawei Mate 50 Pro 5G', 'Realme C32', 'Vivo X80 Pro Plus 5G',
                        'Xiaomi Poco F1', 'iKall Z19', 'Xiaomi Redmi K60 Gaming Edition', 'Apple iPhone SE 4', 'Xiaomi Mi 12 5G',
                        'Vivo Y95', 'Vivo V11i', 'Samsung Galaxy S9 Plus', 'Huawei Honor 9N', 'Xiaomi Redmi Note 4',
                        'Realme G1', 'OnePlus 9T', 'Itel A23 Pro', 'OnePlus Nord SE', 'Xiaomi Redmi K20 Pro Signature Edition',
                        'Lyf Earth 2', 'Apple iPhone 15 Plus', 'Samsung Galaxy A9 Pro', 'Samsung Galaxy A7', 'Vivo Y55S',
                        'itel A23s', 'Honor 50']

# Eliminare le righe che contengono i modelli di cellulare specificati
df = df[~df['model'].isin(models_to_delete)]


##.6 CONVERSIONE DEL PREZZO IN EURO (VALORE DI CONVERSIONE AGGIORNATO AL 9 GIUGNO 2024)
df['price'] = (df['price'] * 0.011).round(2)


##.7 NORMALIZZAZIONE DELLA COLONNA RATING IN BASE DIECI
# Definizione degli intervalli per le stelle
star_range = [60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90]

# Etichette delle stelle
star_label = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

# Applicazione della normalizzazione utilizzando la funzione cut
df['rating'] = pd.cut(df['rating'], bins=star_range, labels=star_label, right=False)

# Salvataggio dell DataFrame modificato in un nuovo file CSV
df.to_csv('smartphone_cleaned_v5_modified.csv', index=False)