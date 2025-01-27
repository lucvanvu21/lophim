import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';

export function MobileHeader({ pages }: { pages: any[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="mt-[62px] bg-[#232d37fd] p-0" side="right">
          <SheetHeader>
            <SheetTitle className="flex justify-center items-center my-2">
              <Link href="/">
                <Image src="/logo2.png" alt="phimtocdo" quality={100} height={50} width={100} />
              </Link>
            </SheetTitle>
            {/* <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription> */}
          </SheetHeader>
        <ScrollArea className="h-[100vh]">
          <div className="p-4 m-0">
            <div className="space-y-6">
              {pages.map(page => (
                <div key={page.label} className='flex flex-col justify-end items-center'>
                  {page.submenus ? (
                    <details className="group">
                      <summary className="text-white text-lg text-center font-medium cursor-pointer mb-2">{page.label}</summary>
                      <ul className="grid grid-cols-2 gap-3">
                        {page.submenus.map(sub => (
                          <li key={sub.href} className="text-center">
                            <Link
                              href={sub.href}
                              className="text-gray-300 hover:text-white block py-1"
                              // onClick={() => setMenuOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={page.href}
                      className="text-white text-lg font-medium block hover:text-gray-300 "
                      // onClick={() => setMenuOpen(false)}
                    >
                      {page.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter> */}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
