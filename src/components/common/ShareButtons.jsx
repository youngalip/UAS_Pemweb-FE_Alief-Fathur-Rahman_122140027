import React from 'react';

const ShareButtons = ({ url, title, description }) => {
  // Ensure we have the correct URL
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareDescription = description || '';

  // Share handlers
  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Link berhasil disalin!');
      })
      .catch(err => {
        console.error('Gagal menyalin link: ', err);
      });
  };

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Bagikan artikel ini:</h3>
      <div className="flex space-x-2">
        <button
          onClick={handleFacebookShare}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          aria-label="Bagikan ke Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={handleTwitterShare}
          className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full"
          aria-label="Bagikan ke Twitter"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </button>
        <button
          onClick={handleWhatsAppShare}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
          aria-label="Bagikan ke WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M21.105 4.502C18.906 2.303 15.92 1 12.687 1 6.105 1 .77 6.335.77 12.917c0 2.1.546 4.15 1.588 5.958L1 24l5.242-1.375a11.88 11.88 0 005.656 1.442h.005c6.582 0 11.917-5.335 11.917-11.917 0-3.182-1.244-6.174-3.495-8.417l-.22-.231zm-8.418 18.334h-.004a9.87 9.87 0 01-5.024-1.375l-.36-.214-3.73.978.998-3.648-.236-.375a9.86 9.86 0 01-1.51-5.285c0-5.471 4.455-9.926 9.932-9.926 2.652 0 5.143 1.035 7.02 2.911 1.876 1.877 2.908 4.369 2.905 7.022 0 5.472-4.455 9.927-9.927 9.927l-.064.005zm5.445-7.438c-.3-.15-1.767-.87-2.04-.969-.273-.099-.472-.149-.67.15-.2.298-.769.968-.941 1.167-.173.2-.346.224-.645.075-.3-.15-1.263-.466-2.403-1.485-.888-.79-1.487-1.768-1.66-2.067-.173-.3-.019-.46.13-.61.133-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.15-.67-1.612-.917-2.207-.242-.58-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.2 0-.52.074-.793.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.273-.198-.571-.347l-.097-.05z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={handleCopyLink}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full"
          aria-label="Salin link"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
