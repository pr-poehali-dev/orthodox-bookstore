import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  discount?: number;
}

const books: Book[] = [
  {
    id: 1,
    title: 'Толкование на Евангелие',
    author: 'Святитель Иоанн Златоуст',
    price: 890,
    oldPrice: 1200,
    image: 'https://cdn.poehali.dev/projects/288c6761-c75c-46a5-9974-7324e76de579/files/b8ec8f8c-6d03-4fbd-9e65-a757ff6a704d.jpg',
    category: 'Богословская литература',
    discount: 25,
  },
  {
    id: 2,
    title: 'Жития Святых',
    author: 'Святитель Димитрий Ростовский',
    price: 1450,
    image: 'https://cdn.poehali.dev/projects/288c6761-c75c-46a5-9974-7324e76de579/files/3a49eb89-0498-4011-8eec-559b42c172e9.jpg',
    category: 'Жития Святых',
    isNew: true,
  },
  {
    id: 3,
    title: 'Молитвослов',
    author: 'Церковное издание',
    price: 350,
    image: 'https://cdn.poehali.dev/projects/288c6761-c75c-46a5-9974-7324e76de579/files/974783fc-3aa6-4bf4-b2f8-f9fb7ffeac4a.jpg',
    category: 'Молитвословы',
  },
  {
    id: 4,
    title: 'Беседы на Псалмы',
    author: 'Святитель Василий Великий',
    price: 720,
    oldPrice: 960,
    image: 'https://cdn.poehali.dev/projects/288c6761-c75c-46a5-9974-7324e76de579/files/b8ec8f8c-6d03-4fbd-9e65-a757ff6a704d.jpg',
    category: 'Богословская литература',
    discount: 25,
  },
  {
    id: 5,
    title: 'Детская Библия в рассказах',
    author: 'Протоиерей Александр Соколов',
    price: 580,
    image: 'https://cdn.poehali.dev/projects/288c6761-c75c-46a5-9974-7324e76de579/files/974783fc-3aa6-4bf4-b2f8-f9fb7ffeac4a.jpg',
    category: 'Детская литература',
    isNew: true,
  },
  {
    id: 6,
    title: 'О воспитании детей',
    author: 'Святитель Иоанн Златоуст',
    price: 420,
    image: 'https://cdn.poehali.dev/projects/288c6761-c75c-46a5-9974-7324e76de579/files/b8ec8f8c-6d03-4fbd-9e65-a757ff6a704d.jpg',
    category: 'Семья и воспитание',
  },
];

const Index = () => {
  const [cart, setCart] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToCart = (book: Book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter((item) => item.id !== bookId));
  };

  const toggleFavorite = (bookId: number) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  const cartTotal = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                ✦
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Православная книга</h1>
                <p className="text-xs text-muted-foreground">Духовная литература</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">
                Каталог
              </a>
              <a href="#sales" className="text-foreground hover:text-primary transition-colors">
                Акции
              </a>
              <a href="#new" className="text-foreground hover:text-primary transition-colors">
                Новинки
              </a>
              <a href="#blog" className="text-foreground hover:text-primary transition-colors">
                Блог
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
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
                              onClick={() => removeFromCart(book.id)}
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

      <section className="relative bg-gradient-to-br from-secondary/30 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Духовная пища для души
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Откройте для себя богатство православной литературы — от святоотеческих творений до современных духовных книг
            </p>
            <Button size="lg" className="shadow-lg">
              Перейти в каталог
            </Button>
          </div>
        </div>
        <div className="absolute top-8 right-8 text-9xl opacity-5 select-none">✦</div>
      </section>

      <section className="py-12 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Доставка по России</h3>
                <p className="text-sm text-muted-foreground">Бесплатно от 3000 ₽</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ShieldCheck" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Гарантия качества</h3>
                <p className="text-sm text-muted-foreground">Только проверенные издания</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">С любовью к книгам</h3>
                <p className="text-sm text-muted-foreground">Более 10 лет на рынке</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="sales" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Акции и спецпредложения</h2>
            <Button variant="outline">Все акции</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books
              .filter((book) => book.discount)
              .map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale">
                  <div className="relative">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-64 object-cover"
                    />
                    {book.discount && (
                      <Badge className="absolute top-3 right-3 bg-accent">
                        -{book.discount}%
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 left-3 bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(book.id)}
                    >
                      <Icon
                        name="Heart"
                        size={20}
                        className={favorites.includes(book.id) ? 'fill-accent text-accent' : ''}
                      />
                    </Button>
                  </div>
                  <CardContent className="pt-4">
                    <Badge variant="outline" className="mb-2">
                      {book.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{book.price} ₽</span>
                      {book.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {book.oldPrice} ₽
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(book)}>
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>

      <section id="new" className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Новинки</h2>
            <Button variant="outline">Все новинки</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books
              .filter((book) => book.isNew)
              .map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale">
                  <div className="relative">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-64 object-cover"
                    />
                    {book.isNew && (
                      <Badge className="absolute top-3 right-3 bg-primary">Новинка</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 left-3 bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(book.id)}
                    >
                      <Icon
                        name="Heart"
                        size={20}
                        className={favorites.includes(book.id) ? 'fill-accent text-accent' : ''}
                      />
                    </Button>
                  </div>
                  <CardContent className="pt-4">
                    <Badge variant="outline" className="mb-2">
                      {book.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{book.price} ₽</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(book)}>
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Каталог литературы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="genres">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Icon name="BookOpen" size={20} />
                    По жанрам
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-7">
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Богословская и святоотеческая литература
                    </a>
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Молитвословы
                    </a>
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Жития Святых
                    </a>
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Детская православная литература
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="authors">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    По авторам
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-7">
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Святые и духовные писатели
                    </a>
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Современные авторы
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="topics">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Icon name="List" size={20} />
                    По тематике
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-7">
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Вера и духовность
                    </a>
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Семья и воспитание
                    </a>
                    <a href="#" className="text-foreground hover:text-primary transition-colors py-2 story-link">
                      Православные праздники
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Популярное</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.slice(0, 3).map((book) => (
              <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale">
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 left-3 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(book.id)}
                  >
                    <Icon
                      name="Heart"
                      size={20}
                      className={favorites.includes(book.id) ? 'fill-accent text-accent' : ''}
                    />
                  </Button>
                </div>
                <CardContent className="pt-4">
                  <Badge variant="outline" className="mb-2">
                    {book.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{book.price} ₽</span>
                    {book.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {book.oldPrice} ₽
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => addToCart(book)}>
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Новости и события</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">15 января 2026</div>
                <h3 className="text-xl font-semibold mb-3">Крещение Господне: история и традиции</h3>
                <p className="text-muted-foreground mb-4">
                  Узнайте больше о великом празднике Крещения и духовных книгах, посвященных этому событию...
                </p>
                <Button variant="link" className="p-0">
                  Читать далее →
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">10 января 2026</div>
                <h3 className="text-xl font-semibold mb-3">Новые поступления святоотеческой литературы</h3>
                <p className="text-muted-foreground mb-4">
                  В нашем каталоге появились редкие издания творений святых отцов Церкви...
                </p>
                <Button variant="link" className="p-0">
                  Читать далее →
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">5 января 2026</div>
                <h3 className="text-xl font-semibold mb-3">Как выбрать духовную книгу для ребенка</h3>
                <p className="text-muted-foreground mb-4">
                  Советы по выбору православной литературы для детей разного возраста...
                </p>
                <Button variant="link" className="p-0">
                  Читать далее →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">О магазине</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Вакансии
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Помощь</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Часто задаваемые вопросы
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Доставка и оплата
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Возврат товара
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Личный кабинет</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Мои заказы
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Избранное
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Настройки
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>8 (800) 555-35-35</li>
                <li>info@pravkniga.ru</li>
                <li>Москва, ул. Примерная, 1</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" size="icon">
                  <Icon name="Mail" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Phone" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2026 Православная книга. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
