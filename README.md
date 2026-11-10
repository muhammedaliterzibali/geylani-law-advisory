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

- Erişim anahtarı `index.html` içindeki formda, `access_key` alanındadır. Web3Forms anahtarları tarayıcıda görünmek üzere tasarlanmıştır; gizli bir API anahtarı değildir. Bu yüzden `.env` dosyasında değil formun içindedir.
- **Giden e-posta:** konu "Yeni Başvuru · <Hukuki Alan> · <Ad Soyad>" biçimindedir. Gövdede Ad Soyad, Telefon, E-posta, Hukuki Alan ve Mesaj Türkçe etiketlerle yer alır. `replyto` doğrulanmış başvuru e-postasıdır; "Yanıtla" doğrudan başvurana gider. Bu değerleri ziyaretçi yazar; doğrulanmış kimlik bilgisi değildir.
- **Doğrulama:** tüm alanlar zorunludur. E-posta biçimi kontrol edilir. Telefon `+` ile başlayabilir; rakam, boşluk, `( ) - .` içerebilir ve 7–15 rakam olmalıdır (uluslararası numaralar kabul edilir). Uzunluk sınırları: ad 100, telefon 25, e-posta 254, mesaj 3000 karakter. Konu ve tek satırlık alanlardan satır sonları temizlenir.
- **Spam / kötüye kullanım:** görünmez `botcheck` alanı (Web3Forms reddeder) ve sayfa açıldıktan sonraki ilk 3 saniyede yapılan otomatik gönderimlerin engellenmesi.
- **Durumlar:** gönderim sırasında buton kilitlenir ve "Gönderiliyor…" gösterir (çift gönderim olmaz). Başarı mesajı yalnızca Web3Forms `success: true` döndürdüğünde gösterilir. Reddedilme, hız sınırı (429), zaman aşımı ve bağlantı hatası için ayrı Türkçe mesajlar vardır; bilgiler formda kalır ve tekrar denenebilir.
- Sitedeki "Davanızı Başlatın" bağlantıları forma kaydırır ve ilk alana odaklanır.
- JavaScript kapalıysa form yine doğrudan Web3Forms'a gönderilir.
- claude.ai önizlemesi dış sitelere bağlanamaz. Orada başvuru yalnızca önizlemenin kayıtlarına eklenir ve ziyaretçiye e-posta gönderilmediği açıkça söylenir.

### Etkinleştirme kontrol listesi

1. av.kadirterzibali@gmail.com ile https://web3forms.com panelinde oturum açın ve `0bea8867-…` anahtarının bu adrese bağlı olduğunu görün. Bağlı değilse bu adresle yeni anahtar oluşturup `index.html` içindeki `access_key` değerini değiştirin.
2. Siteyi yayınlayın (ör. GitHub → Settings → Pages → Branch: `main`, klasör: `/ (root)`).
3. Yayındaki sitede gerçek bir deneme başvurusu gönderin; e-postanın gelen kutusuna (ve gerekirse spam klasörüne) düştüğünü kontrol edin.
