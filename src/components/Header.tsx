import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
}

interface HeaderProps {
  cart: Book[];
  onRemoveFromCart: (bookId: number) => void;
}

const Header = ({ cart, onRemoveFromCart }: HeaderProps) => {
  const cartTotal = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              ✦
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Православная книга</h1>
              <p className="text-xs text-muted-foreground">Духовная литература</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-foreground hover:text-primary transition-colors">
              Каталог
            </Link>
            <a href="/#sales" className="text-foreground hover:text-primary transition-colors">
              Акции
            </a>
            <a href="/#new" className="text-foreground hover:text-primary transition-colors">
              Новинки
            </a>
            <a href="/#blog" className="text-foreground hover:text-primary transition-colors">
              Блог
            </a>
            <a href="/#about" className="text-foreground hover:text-primary transition-colors">
              О магазине
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((book, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{book.title}</h4>
                            <p className="text-xs text-muted-foreground">{book.author}</p>
                            <p className="text-primary font-semibold mt-1">{book.price} ₽</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveFromCart(book.id)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-xl font-bold text-primary">{cartTotal} ₽</span>
                        </div>
                        <Button className="w-full">Оформить заказ</Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
