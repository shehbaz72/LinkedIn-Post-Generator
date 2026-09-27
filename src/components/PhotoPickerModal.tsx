import React, { useRef } from 'react';
import { PostAttachment } from '../types';
import { CONFERENCE_STOCK_PHOTOS } from '../data/mockData';

interface PhotoPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAttachment: PostAttachment | null;
  onSelectPhoto: (photo: PostAttachment) => void;
  onShowToast: (message: string) => void;
}

export const PhotoPickerModal: React.FC<PhotoPickerModalProps> = ({
  isOpen,
  onClose,
  currentAttachment,
  onSelectPhoto,
  onShowToast,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        const newAttachment: PostAttachment = {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          badge: 'Attendee Upload',
          imageUrl: resultUrl,
          caption: 'Attendee Photo · Moscone Center',
        };
        onSelectPhoto(newAttachment);
        onShowToast(`Uploaded ${file.name}`);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-[#c1c6d4]/50 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#eaedff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0a66c2]">photo_library</span>
            <h3 className="font-bold text-[#131b2e] text-base">Select Conference Photo</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#727783] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex flex-col gap-4">
          {/* Custom Upload Trigger */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 border-dashed border-[#0a66c2]/40 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#0a66c2] font-semibold text-sm transition-all cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              upload_file
            </span>
            <span>Upload Photo from Device (JPG, PNG)</span>
          </button>

          <div>
            <span className="text-xs font-bold text-[#414752] uppercase tracking-wider block mb-2">
              Official Summit Live Media Gallery
            </span>
            <div className="grid grid-cols-2 gap-3">
              {CONFERENCE_STOCK_PHOTOS.map((photo) => {
                const isSelected = currentAttachment?.imageUrl === photo.imageUrl;
                return (
                  <div
                    key={photo.name}
                    onClick={() => {
                      onSelectPhoto(photo);
                      onShowToast(`Selected ${photo.badge}`);
                      onClose();
                    }}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      isSelected
                        ? 'border-[#0a66c2] shadow-md ring-2 ring-[#0a66c2]/20'
                        : 'border-transparent hover:border-[#8cb7ff] shadow-sm'
                    }`}
                  >
                    <div className="aspect-video w-full bg-[#eaedff] overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#131b2e]">
                        <span className="truncate">{photo.badge}</span>
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px] text-[#0a66c2]">
                            check_circle
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#727783] block truncate">{photo.caption}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white border border-[#c1c6d4] text-[#131b2e] font-semibold text-xs hover:bg-[#eaedff] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
