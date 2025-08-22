import React from 'react';

const FooterSection = ({ footer }) => (
  <div className="text-[10px] text-gray-500 flex flex-wrap gap-4 justify-between mt-2">
    <div>Created: {footer.created_at.slice(0,10)} by {footer.created_by}</div>
    <div>Updated: {footer.updated_at.slice(0,10)} by {footer.last_modified_by}</div>
    <div>Version: {footer.version}</div>
  </div>
);

export default FooterSection;
