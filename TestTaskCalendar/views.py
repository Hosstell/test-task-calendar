# from django.shortcuts import render
# from django.http import HttpResponse
#
# from django.http import HttpResponse
#
# from django.template import loader
#
#
# def index(request):
#     print('Hello')
#     # return render(request, )
#     template=loader.get_template('./../front/dist/index.html')
#
#     return HttpResponse(template)


# Create your views here.
from django.http import HttpResponse
from django.template import Context, loader

def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())