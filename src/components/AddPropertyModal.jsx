import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useProperty } from '../context/PropertyContext';
import { translations, localities, propertyCategories, areaUnits, furnishingOptions } from '../data/properties';
import { X, CheckCircle, UploadCloud, AlertCircle, ShieldCheck, FileText } from 'lucide-react';

export default function AddPropertyModal({ onClose, onSuccess }) {
  const { isDark, language, user } = useTheme();
  const { addProperty } = useProperty();
  const t = translations[language];

  const [formData, setFormData] = useState({
    title: '',
    purpose: 'sale',
    category: 'homes',
    locality: 'Butwal',
    price: '',
    area: '',
    areaUnit: 'sqyd',
    bedrooms: '3',
    bathrooms: '2',
    subtype: 'Independent House',
    floor: 'Ground + First',
    furnishing: 'Semi-furnished',
    facing: 'North-East',
    roadAccess: '30 ft road',
    electricity: 'NEA connection with backup',
    water: 'Boring + Municipal supply',
    description: '',
    imageUrl: '/images/properties/residential_plot_1.jpg',
  });

  const [lalpurjaFileName, setLalpurjaFileName] = useState('');
  const [submittedProperty, setSubmittedProperty] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError(language === 'en' ? 'Please provide a property title' : 'कृपया प्रॉपर्टी का शीर्षक दर्ज करें');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError(language === 'en' ? 'Please specify a valid asking price' : 'कृपया मान्य मूल्य दर्ज करें');
      return;
    }
    if (!formData.area || Number(formData.area) <= 0) {
      setError(language === 'en' ? 'Please specify property area' : 'कृपया प्रॉपर्टी का क्षेत्रफल दर्ज करें');
      return;
    }

    const priceNum = Number(formData.price);
    const priceLabel = formData.purpose === 'sale'
      ? (priceNum >= 10000000 ? `Rs. ${(priceNum / 10000000).toFixed(2)} Crore` : `Rs. ${(priceNum / 100000).toFixed(1)} Lakh`)
      : `Rs. ${priceNum.toLocaleString('en-US')}/month`;

    const newProp = addProperty({
      title: formData.title,
      purpose: formData.purpose,
      category: formData.category,
      locality: formData.locality,
      district: 'Rupandehi',
      price: priceNum,
      priceLabel: priceLabel,
      area: Number(formData.area),
      areaUnit: formData.areaUnit,
      bedrooms: formData.category === 'homes' ? Number(formData.bedrooms) : null,
      bathrooms: formData.category === 'homes' || formData.category === 'commercial' ? Number(formData.bathrooms) : null,
      subtype: formData.subtype,
      floor: formData.floor,
      furnishing: formData.furnishing,
      facing: formData.facing,
      roadAccess: formData.roadAccess,
      electricity: formData.electricity,
      water: formData.water,
      description: formData.description || `${formData.title} in ${formData.locality}, Rupandehi.`,
      highlights: ['Direct owner listing', 'Verified dimensions', 'Prime locality'],
      images: [formData.imageUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
      owner: {
        name: user ? user.name : 'Anil Chaudhary',
        phone: '9817486280',
      },
    });

    setSubmittedProperty(newProp);
    if (onSuccess) onSuccess(newProp);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content max-w-2xl animate-scale-in max-h-[90vh] overflow-y-auto ${isDark ? '' : 'bg-white border-[#E3DEC3]'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-5">
          <div>
            <span className="section-kicker">
              {language === 'en' ? 'SELLER DESK SUBMISSION' : 'सेलर डेस्क सबमिशन'}
            </span>
            <h2 className={`text-xl font-serif font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'en' ? 'List your property in Rupandehi' : 'रूपन्देही में अपनी संपत्ति सूचीबद्ध करें'}
            </h2>
            <p className={`text-xs mt-1 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {language === 'en'
                ? 'Zero seller commission. Our team reviews each submission before publication.'
                : 'शून्य सेलर कमीशन। हमारी टीम प्रकाशन से पहले प्रत्येक सबमिशन की समीक्षा करती है।'}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors ${
              isDark ? 'border-[#23382A] text-[#A7B5A8] hover:text-[#F3F6F3]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:text-[#152419]'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {submittedProperty ? (
          <div className="py-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#C8E972]/20 text-[#C8E972] mx-auto flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? 'Listing Submitted Successfully!' : 'लिस्टिंग सफलतापूर्वक सबमिट हो गई!'}
            </h3>
            <p className={`text-sm max-w-md mx-auto mb-4 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {language === 'en'
                ? 'Your property draft has been created and assigned a unique verification code.'
                : 'आपका प्रॉपर्टी ड्राफ्ट बन गया है और इसे एक सत्यापन कोड सौंपा गया है।'}
            </p>

            <div className={`p-4 rounded-xl border max-w-sm mx-auto mb-6 ${isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#F4F0E6] border-[#E3DEC3]'}`}>
              <div className="text-xs text-[#829685] mb-1">{language === 'en' ? 'Generated Property ID' : 'प्रॉपर्टी कोड'}</div>
              <div className="font-mono text-lg font-bold text-[#C8E972]">{submittedProperty.id}</div>
              <div className="text-xs text-[#A7B5A8] mt-1">{submittedProperty.title} · {submittedProperty.locality}</div>
            </div>

            <button
              onClick={onClose}
              className="btn-primary justify-center text-sm px-6 py-2.5"
            >
              {language === 'en' ? 'Done & Return to Desk' : 'संपन्न और डेस्क पर लौटें'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            {/* Purpose & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {language === 'en' ? 'Listing Purpose' : 'लिस्टिंग का उद्देश्य'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, purpose: 'sale' }))}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      formData.purpose === 'sale'
                        ? 'bg-[#C8E972] text-[#0D1611] border-[#C8E972]'
                        : isDark ? 'border-[#23382A] text-[#A7B5A8]' : 'border-[#E3DEC3] text-[#5C6B5E]'
                    }`}
                  >
                    {t.buyProperty}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, purpose: 'rent' }))}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      formData.purpose === 'rent'
                        ? 'bg-[#C8E972] text-[#0D1611] border-[#C8E972]'
                        : isDark ? 'border-[#23382A] text-[#A7B5A8]' : 'border-[#E3DEC3] text-[#5C6B5E]'
                    }`}
                  >
                    {t.rentProperty}
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {t.propertyTypeLabel}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field text-xs py-2.5"
                >
                  {propertyCategories.map(cat => (
                    <option key={cat.id} value={cat.id} className={isDark ? 'bg-[#0B130E]' : 'bg-white'}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {language === 'en' ? 'Property Title / Heading' : 'प्रॉपर्टी शीर्षक'}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={language === 'en' ? 'e.g. 3 BHK independent house near Highway' : 'उदा. हाइवे के पास 3 BHK घर'}
                className="input-field text-xs py-2.5"
                required
              />
            </div>

            {/* Locality & Asking Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {language === 'en' ? 'Locality in Rupandehi' : 'रूपन्देही में स्थान'}
                </label>
                <select
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  className="input-field text-xs py-2.5"
                >
                  {localities.map(loc => (
                    <option key={loc} value={loc} className={isDark ? 'bg-[#0B130E]' : 'bg-white'}>
                      {loc} · Rupandehi
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {formData.purpose === 'sale'
                    ? (language === 'en' ? 'Total Asking Price (NPR - Rs.)' : 'कुल माँग मूल्य (नेरू)')
                    : (language === 'en' ? 'Monthly Rent (NPR - Rs.)' : 'मासिक किराया (नेरू)')}
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder={formData.purpose === 'sale' ? '8500000' : '15000'}
                  className="input-field text-xs py-2.5"
                  required
                />
              </div>
            </div>

            {/* Area & Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {language === 'en' ? 'Total Area Size' : 'कुल क्षेत्रफल'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="200"
                    className="input-field text-xs py-2.5"
                    required
                  />
                  <select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    className="input-field text-xs py-2.5"
                  >
                    {areaUnits.map(u => (
                      <option key={u.value} value={u.value} className={isDark ? 'bg-[#0B130E]' : 'bg-white'}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {t.furnishing}
                </label>
                <select
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                  className="input-field text-xs py-2.5"
                >
                  {furnishingOptions.map(f => (
                    <option key={f} value={f} className={isDark ? 'bg-[#0B130E]' : 'bg-white'}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bedrooms & Subtype */}
            {formData.category === 'homes' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                    {t.bedrooms}
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="input-field text-xs py-2.5"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                    {language === 'en' ? 'Property Subtype' : 'उप-प्रकार'}
                  </label>
                  <input
                    type="text"
                    name="subtype"
                    value={formData.subtype}
                    onChange={handleChange}
                    placeholder="Independent House, Villa, Floor..."
                    className="input-field text-xs py-2.5"
                  />
                </div>
              </div>
            )}

            {/* Photo Image URL */}
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {language === 'en' ? 'Property Photo URL' : 'प्रॉपर्टी फोटो URL'}
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="input-field text-xs py-2.5"
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {language === 'en' ? 'Key Features & Description' : 'मुख्य विवरण और विवरण'}
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder={language === 'en' ? 'Detail about road access, power, water, nearby landmarks...' : 'सड़क, बिजली, पानी, आस-पास के लैंडमार्क का विवरण...'}
                className="input-field text-xs py-2"
              />
            </div>

            {/* Direct owner info banner */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#F4F0E6] border-[#E3DEC3]'}`}>
              <div>
                <span className="text-[#829685]">{language === 'en' ? 'Assigned Advisor / Owner' : 'अधिकृत सलाहकार / मालिक'}: </span>
                <strong className={isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}>Anil Chaudhary</strong>
              </div>
              <div>
                <span className="text-[#829685]">{language === 'en' ? 'Contact' : 'संपर्क'}: </span>
                <strong className="text-[#C8E972]">9817486280</strong>
              </div>
            </div>

            {/* Lalpurja Title Verification Vault */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#FAF8F2] border-[#E3DEC3]'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck size={16} className="text-[#2E7D32]" />
                <label className={`text-xs font-semibold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                  {language === 'en'
                    ? 'Title Verification Certificate (Lalpurja / Naksa)'
                    : 'जग्गाधनी प्रमाणपुर्जा (लालपुर्जा / नक्सा ट्रेस)'}
                </label>
              </div>
              <p className={`text-[11px] mb-3 leading-relaxed ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                {language === 'en'
                  ? 'Optional for submission, required for "Verified Title" badge. Encrypted upload reviewed solely by our verification desk. Never made public.'
                  : 'वैकल्पिक। "प्रमाणित लालपुर्जा" ब्याज पाउनको लागि आवश्यक छ। यो फाइल गोप्य रहनेछ र सार्वजनिक रूपमा कहिल्यै देखाइने छैन।'}
              </p>

              <div className="flex items-center gap-3">
                <label className={`cursor-pointer text-xs px-4 py-2 rounded-xl border flex items-center gap-2 transition-colors ${
                  isDark ? 'border-[#23382A] bg-[#132018] text-[#A7B5A8] hover:text-[#F3F6F3]' : 'border-[#E3DEC3] bg-white text-[#5C6B5E] hover:text-[#152419]'
                }`}>
                  <UploadCloud size={14} className="text-[#2E7D32]" />
                  <span>{lalpurjaFileName ? 'Replace Document' : 'Upload Lalpurja (PDF / Image)'}</span>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setLalpurjaFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
                {lalpurjaFileName && (
                  <span className="text-xs text-[#2E7D32] flex items-center gap-1 font-medium truncate max-w-[200px]">
                    <FileText size={14} />
                    {lalpurjaFileName}
                  </span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-outline flex-1 justify-center text-xs py-3"
              >
                {t.close}
              </button>
              <button
                type="submit"
                className="btn-primary flex-1 justify-center text-xs py-3 font-semibold"
              >
                {language === 'en' ? 'Submit Property for Review' : 'समीक्षा के लिए सबमिट करें'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
