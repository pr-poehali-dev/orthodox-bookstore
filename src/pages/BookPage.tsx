import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { books, Book } from '@/data/books';

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Book[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header cart={cart} onRemoveFromCart={(bookId) => setCart(cart.filter((b) => b.id !== bookId))} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon name="BookX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Книга не найдена</h2>
            <p className="text-muted-foreground mb-6">Возможно, она была удалена или перемещена</p>
            <Button onClick={() => navigate('/catalog')}>Вернуться в каталог</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const addToCart = () => {
    const itemsToAdd = Array(quantity).fill(book);
    setCart([...cart, ...itemsToAdd]);
  };

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter((item) => item.id !== bookId));
  };

  const relatedBooks = books
    .filter((b) => b.id !== book.id && (b.genre === book.genre || b.category === book.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cart={cart} onRemoveFromCart={removeFromCart} />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
              Вернуться в каталог
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-lg"
              />
              {book.discount && (
                <Badge className="absolute top-4 right-4 bg-accent text-lg px-4 py-2">
                  -{book.discount}%
                </Badge>
              )}
              {book.isNew && (
                <Badge className="absolute top-4 right-4 bg-primary text-lg px-4 py-2">
                  Новинка
                </Badge>
              )}
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <Badge variant="outline" className="mb-3">
                  {book.genre}
                </Badge>
                <h1 className="text-4xl font-bold mb-3">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-2">{book.author}</p>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">{book.price} ₽</span>
                {book.oldPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {book.oldPrice} ₽
                  </span>
                )}
                {book.discount && (
                  <Badge variant="secondary" className="text-sm">
                    Экономия {book.oldPrice! - book.price} ₽
                  </Badge>
                )}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="BookOpen" size={20} />
                  <span>Жанр: {book.genre}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="User" size={20} />
                  <span>Автор: {book.category}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Tag" size={20} />
                  <span>Тематика: {book.topic}</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Icon name="Check" size={20} />
                  <span className="font-medium">В наличии</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <Button size="lg" className="flex-1" onClick={addToCart}>
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={isFavorite ? 'fill-accent text-accent' : ''}
                  />
                </Button>
              </div>

              <Card className="bg-accent/5">
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Truck" size={18} className="text-primary" />
                      <span>Доставка по России от 3-5 дней</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" size={18} className="text-primary" />
                      <span>Гарантия подлинности издания</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="RefreshCw" size={18} className="text-primary" />
                      <span>Возврат в течение 14 дней</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="details">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы (12)</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg leading-relaxed">{book.description}</p>
                  <Separator className="my-6" />
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-3">О книге</h3>
                    <p>
                      Эта книга — ценный источник духовной мудрости, который поможет углубить
                      понимание православной веры и укрепить духовную жизнь. Автор, опираясь на
                      святоотеческое наследие, раскрывает важные аспекты христианского учения.
                    </p>
                    <p className="mt-4">
                      Рекомендуется как для начинающих на пути духовного роста, так и для тех,
                      кто уже имеет опыт изучения православной литературы. Книга написана
                      доступным языком и содержит множество практических советов.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Автор</span>
                      <span className="font-medium">{book.author}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Жанр</span>
                      <span className="font-medium">{book.genre}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Категория</span>
                      <span className="font-medium">{book.category}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Тематика</span>
                      <span className="font-medium">{book.topic}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Год издания</span>
                      <span className="font-medium">2025</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Страниц</span>
                      <span className="font-medium">320</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Переплет</span>
                      <span className="font-medium">Твердый</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">ISBN</span>
                      <span className="font-medium">978-5-1234-5678-9</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Мария Петрова</p>
                          <p className="text-sm text-muted-foreground">12 января 2026</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon key={star} name="Star" size={16} className="fill-primary text-primary" />
                        ))}
                      </div>
                      <p>
                        Прекрасная книга! Читается легко, много полезных мыслей. Рекомендую всем,
                        кто интересуется духовной литературой.
                      </p>
                    </div>
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Андрей Смирнов</p>
                          <p className="text-sm text-muted-foreground">8 января 2026</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon key={star} name="Star" size={16} className="fill-primary text-primary" />
                        ))}
                      </div>
                      <p>
                        Очень качественное издание. Хороший перевод, удобный формат. Доставка
                        быстрая, всё упаковано отлично.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    Оставить отзыв
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {relatedBooks.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Похожие книги</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBooks.map((relatedBook) => (
                  <Link key={relatedBook.id} to={`/book/${relatedBook.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale h-full">
                      <div className="relative">
                        <img
                          src={relatedBook.image}
                          alt={relatedBook.title}
                          className="w-full h-48 object-cover"
                        />
                        {relatedBook.discount && (
                          <Badge className="absolute top-2 right-2 bg-accent">
                            -{relatedBook.discount}%
                          </Badge>
                        )}
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-1 line-clamp-2">{relatedBook.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {relatedBook.author}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">
                            {relatedBook.price} ₽
                          </span>
                          {relatedBook.oldPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {relatedBook.oldPrice} ₽
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookPage;
