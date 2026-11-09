# Geylani Law Advisory

Av. Abdulkadir Geylani Terzibali için hazırlanmış tek sayfalık, animasyonlu hukuk bürosu sitesi.

## Yerelde çalıştırma

Node.js kurulu olmalıdır.

```bash
node sunucu.js
```

Ardından tarayıcıda `http://localhost:8080` adresini açın. `sunucu.js`, videoların Safari ve iPhone dahil her tarayıcıda oynaması için parçalı (Range) istekleri destekler.

## Klasör yapısı

- `index.html`: sayfanın tamamı (HTML, CSS ve JavaScript)
- `img/`: fotoğraflar, video kapak görselleri ve videoların hareketli WebP yedekleri
- `video/`: ana sayfa ve tanıtım videoları
- `sunucu.js`: bağımlılık gerektirmeyen küçük yerel sunucu

## Gizli bilgiler

API anahtarı gibi gizli değerler `.env` dosyasına yazılır. `.env` dosyası `.gitignore` ile korunur ve GitHub'a yüklenmez. Hangi değişkenlerin gerektiğini göstermek için yalnızca içi boş `.env.example` dosyası yüklenir.

## Başvuru formu

Form, claude.ai üzerinde yayınlanan sürümde başvuruları kaydeder. Başka bir sunucuda yayınlanırsa formun bir form servisine (ör. Formspree) bağlanması gerekir.
