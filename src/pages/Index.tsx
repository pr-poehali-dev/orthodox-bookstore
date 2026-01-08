import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { books as allBooks, Book } from '@/data/books';
import { blogPosts } from '@/data/blogPosts';

const books = allBooks.slice(0, 6);

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



  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} onRemoveFromCart={removeFromCart} />

      <section className="relative bg-gradient-to-br from-secondary/30 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Духовная пища для души
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Откройте для себя богатство православной литературы — от святоотеческих творений до современных духовных книг
            </p>
            <Link to="/catalog">
              <Button size="lg" className="shadow-lg">
                Перейти в каталог
              </Button>
            </Link>
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
            <Link to="/catalog">
              <Button variant="outline">Все акции</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books
              .filter((book) => book.discount)
              .map((book) => (
                <Link to={`/book/${book.id}`} key={book.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale">
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
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(book.id);
                        }}
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
                      <Button
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(book);
                        }}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section id="new" className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Новинки</h2>
            <Link to="/catalog">
              <Button variant="outline">Все новинки</Button>
            </Link>
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
              <Link to={`/book/${book.id}`} key={book.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale">
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
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(book.id);
                      }}
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
                    <Button
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(book);
                      }}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Новости и события</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
                    <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {post.preview}
                    </p>
                    <Button variant="link" className="p-0">
                      Читать далее →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;