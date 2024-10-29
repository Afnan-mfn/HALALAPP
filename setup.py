from setuptools import setup, find_packages
setup(
    name='ingredientProject',
    version='0.1.0',
    packages=find_packages(),
    install_requires=[
        # 这里填写项目依赖的包，例如
        'Flask==3.0.3',
        'requests==2.31.0',
    ],
    entry_points={
        'console_scripts': [
            'your_script_name=your_package.module:main_function',
        ],
    },
)
