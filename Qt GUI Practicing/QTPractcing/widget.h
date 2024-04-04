#ifndef WIDGET_H
#define WIDGET_H

#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui {
class Widget;
}
QT_END_NAMESPACE

class Widget : public QMainWindow
{
    Q_OBJECT

public:
    Widget(QWidget *parent = nullptr);
    ~Widget();

private slots:
    void on_guessbtn_clicked();

    void on_StartGameBtn_clicked();

private:
    Ui::Widget *ui;
    int secret_number;
    int guess_number;
};
#endif // WIDGET_H
