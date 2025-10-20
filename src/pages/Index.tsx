import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const services = [
    {
      title: 'Индивидуальная консультация',
      description: 'Работа с личными запросами, тревожностью, депрессией',
      icon: 'User',
      duration: '60 минут'
    },
    {
      title: 'Семейная терапия',
      description: 'Помощь в решении семейных конфликтов и улучшении отношений',
      icon: 'Users',
      duration: '90 минут'
    },
    {
      title: 'Групповая терапия',
      description: 'Работа в группе для обмена опытом и поддержки',
      icon: 'UsersRound',
      duration: '120 минут'
    },
    {
      title: 'Онлайн-консультация',
      description: 'Удобный формат консультации из любой точки мира',
      icon: 'Video',
      duration: '60 минут'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedTime) {
      toast.error('Пожалуйста, выберите дату и время');
      return;
    }
    toast.success('Заявка отправлена! Я свяжусь с вами в ближайшее время.');
    setIsDialogOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Психолог</h1>
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
                Обо мне
              </button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors">
                Услуги
              </button>
              <button onClick={() => scrollToSection('approach')} className="text-sm font-medium hover:text-primary transition-colors">
                Подход к работе
              </button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Запись на консультацию</DialogTitle>
                  <DialogDescription>
                    Выберите удобную дату и время для консультации
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" placeholder="Ваше имя" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                      </div>
                      <div>
                        <Label htmlFor="service">Тип консультации</Label>
                        <Select>
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Выберите услугу" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.title} value={service.title}>
                                {service.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="comment">Комментарий</Label>
                        <Textarea id="comment" placeholder="Расскажите о вашем запросе" rows={3} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Выберите дату</Label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </div>
                      <div>
                        <Label>Выберите время</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="w-full"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Путь к гармонии начинается здесь
              </h1>
              <p className="text-xl text-muted-foreground">
                Профессиональная психологическая помощь в комфортной и безопасной атмосфере
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(true)}>
                  Записаться на консультацию
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/7510adc6-9e9c-4ada-be04-a73d8b128b69/files/f46c9486-de52-497a-90b8-be8089fd2e68.jpg" 
                alt="Кабинет психолога" 
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Обо мне</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div className="animate-scale-in">
                <img 
                  src="https://cdn.poehali.dev/files/5eaca33d-bb22-4a37-8940-c246c3a63597.jpg" 
                  alt="Психолог" 
                  className="rounded-2xl shadow-xl w-full object-cover max-w-md mx-auto"
                />
              </div>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Я — практикующий психолог с более чем 10-летним опытом работы. Имею высшее психологическое образование, 
                  регулярно повышаю квалификацию и прохожу личную терапию.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Моя специализация — работа с тревожными расстройствами, депрессией, кризисными состояниями 
                  и улучшением качества межличностных отношений.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Я создаю безопасное пространство, где каждый может открыто говорить о своих переживаниях 
                  и найти поддержку на пути к внутренней гармонии.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name="GraduationCap" className="mx-auto mb-2 text-primary" size={40} />
                  <CardTitle>Образование</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    МГУ им. М.В. Ломоносова
                    <br />Клиническая психология
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name="Award" className="mx-auto mb-2 text-primary" size={40} />
                  <CardTitle>Опыт</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Более 10 лет
                    <br />практической работы
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name="Heart" className="mx-auto mb-2 text-primary" size={40} />
                  <CardTitle>Клиенты</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Более 500 человек
                    <br />обрели гармонию
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Услуги</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Предлагаю различные форматы психологической помощи, адаптированные под ваши потребности
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <Icon name={service.icon as any} className="mb-4 text-primary" size={48} />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>{service.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Подход к работе</h2>
            <p className="text-lg text-muted-foreground">
              Моя работа основана на научно-обоснованных методах и индивидуальном подходе к каждому клиенту
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Brain" className="text-primary" size={24} />
                  Когнитивно-поведенческая терапия
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Работа с мыслями, эмоциями и поведением для достижения устойчивых позитивных изменений в жизни.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lightbulb" className="text-primary" size={24} />
                  Гештальт-терапия
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Фокус на осознанности, личной ответственности и проживании актуального опыта "здесь и сейчас".
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="HeartHandshake" className="text-primary" size={24} />
                  Экзистенциальный подход
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Исследование смысла жизни, свободы выбора и личной ответственности за свою судьбу.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Shield" className="text-primary" size={24} />
                  Конфиденциальность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Полная конфиденциальность и безопасное пространство для открытого диалога и личностного роста.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Готовы сделать первый шаг?</h2>
          <p className="text-lg mb-8 opacity-90">
            Запишитесь на консультацию сегодня и начните путь к улучшению качества вашей жизни
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-primary"
            onClick={() => setIsDialogOpen(true)}
          >
            Записаться на консультацию
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Психологическая помощь. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;