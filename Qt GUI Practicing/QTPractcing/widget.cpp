#include "widget.h"
#include "ui_widget.h"
#include <QDebug>

Widget::Widget(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);

    std::srand(std::time(nullptr));

    secret_number = std::rand() % 10 + 1;

    //Disable the start Over buttin
    ui->StartGameBtn->setDisabled(true);

    //ui
    ui->OutPutTxt->setText(" ");
}

Widget::~Widget()
{
    delete ui;
}

void Widget::on_guessbtn_clicked()
{
    guess_number =  ui->NumSpin->value();

     //qDebug() <<  "User guess " << QString::number(guess_number);

    //check if the user guest is correvt
    if(guess_number == secret_number)
    {
         ui->OutPutTxt->setText( "Congratulations, the number is " + QString::number(guess_number));
        //buttom houekeeping
         ui->guessbtn->setDisabled(true);
         ui->StartGameBtn->setDisabled(false);

    }else
    {
        if(secret_number < guess_number){
            ui->OutPutTxt->setText("Number is lower than that");
        }
        if ( secret_number > guess_number){
            ui->OutPutTxt->setText("Number is higher than that");
        }

    }
}


void Widget::on_StartGameBtn_clicked()
{
    ui->guessbtn->setDisabled(false);
    ui->StartGameBtn->setDisabled(true);

    ui->NumSpin->setValue(1);

    //Regenerate the random number
    secret_number = std::rand() % 10 + 1;

    //Clear the message label
    ui->OutPutTxt->setText("New Game");


}

