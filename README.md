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

## Başvuru formu (Web3Forms)

"Davanıza Bugün Başlayın" bölümündeki form, başvuruları [Web3Forms](https://web3forms.com) üzerinden e-posta olarak gönderir. E-postalar, erişim anahtarının Web3Forms panelinde bağlı olduğu adrese (av.kadirterzibali@gmail.com) gider; alıcı adresi koddan değil, Web3Forms panelinden değiştirilir.

- Erişim anahtarı `index.html` içindeki formda, `access_key` alanındadır. Web3Forms anahtarları tarayıcıda görünmek üzere tasarlanmıştır; gizli bir API anahtarı değildir. Kötüye kullanımı önlemek için Web3Forms panelinden anahtarı yalnızca sitenizin alan adıyla sınırlayabilirsiniz.
- Spam koruması için görünmez bir `botcheck` alanı vardır.
- Gönderim sırasında buton "Gönderiliyor…" durumuna geçer; sonuç hem formun altında hem de ekranın altında açılan bir bildirimle gösterilir.
- Sitedeki "Davanızı Başlatın" bağlantıları forma kaydırır ve ilk alana odaklanır.
- JavaScript kapalıysa form yine doğrudan Web3Forms'a gönderilir.
- claude.ai önizlemesi dış sitelere bağlanamadığı için orada başvurular sayfanın kendi kaydına yazılır.
