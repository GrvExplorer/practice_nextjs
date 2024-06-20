import React from "react";

function AuthLayout({ children }: React.ReactNode) {
  return (
    <div>
      <div className="flex h-screen justify-between">
        <section className="flex flex-1 flex-col items-center justify-center py-10">
          {children}
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
