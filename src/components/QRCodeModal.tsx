import React from 'react';
import { EventCampaign } from '../types';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: EventCampaign;
  onShowToast: (message: string) => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onShowToast,
}) => {
  if (!isOpen) return null;

  // Use a reliable SVG QR code generator API for the attendee link
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
    `https://${campaign.attendeeSlug}`
  )}&margin=12`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${campaign.id}-attendee-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('QR Code downloaded! Perfect for badges & signage.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-[#c1c6d4]/50 flex flex-col text-center">
        {/* Header */}
        <div className="p-4 border-b border-[#eaedff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0a66c2]">qr_code_2</span>
            <h3 className="font-bold text-[#131b2e] text-base">Attendee Access QR</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#727783] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* QR Code Presentation */}
        <div className="p-6 flex flex-col items-center gap-3">
          <div className="p-3 bg-white rounded-2xl shadow-lg border-2 border-[#eaedff]">
            <img
              src={qrCodeUrl}
              alt="Attendee Generator Link QR Code"
              className="w-56 h-56 object-contain"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-[#131b2e]">{campaign.name}</span>
            <span className="text-xs text-[#0a66c2] font-mono font-medium">
              https://{campaign.attendeeSlug}
            </span>
            <p className="text-[11px] text-[#414752] mt-1">
              Print this code on conference badges, lanyard cards, keynote slides, and registration desks.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#eaedff] flex flex-col gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-2.5 px-4 rounded-xl bg-[#0a66c2] hover:bg-[#004e99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download High-Res PNG</span>
          </button>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(`https://${campaign.attendeeSlug}`);
              onShowToast('Attendee generator link copied!');
            }}
            className="w-full py-2 px-4 rounded-xl bg-white border border-[#c1c6d4] text-[#131b2e] font-semibold text-xs hover:bg-[#eaedff] transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-[#0a66c2]">content_copy</span>
            <span>Copy Generator URL</span>
          </button>
        </div>
      </div>
    </div>
  );
};
